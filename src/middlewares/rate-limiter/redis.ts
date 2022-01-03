import { NextFunction, Request, Response } from "express";
import moment from "moment";
import redisClientConfig from "../../config/redis";
import {
  RateLimitDurationUnit,
  RateLimitPayload,
} from "../../interfaces/rateLimitPayload";

// https://www.section.io/engineering-education/nodejs-rate-limiting/
// https://github.com/worldclassdev/node-rate-limiter/blob/master/src/middlewares/rateLimiter.js
// {
//   url: 'redis://alice:foobared@awesome.redis.server:6380'
// }
export default (
  url: string,
  windowSize: number,
  maxWindowRequestCount: number,
  windowLogInterval: number,
  durationUnit: RateLimitDurationUnit
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // check for the compatibility of rate-limit duration-unit
      // if (
      //   durationUnit !== RateLimitDuration.HOURS &&
      //   durationUnit !== RateLimitDuration.MINUTES &&
      //   durationUnit !== RateLimitDuration.SECONDS
      // ) {
      //   console.log(
      //     "[Redis] Rate-limit duration is neither hours nor minutes",
      //     durationUnit
      //   );
      //   process.exit(1);
      // }

      const client = redisClientConfig({ url });

      // check that redis client exists
      if (!client) {
        console.log("[Redis] Client does not exist!");

        throw new Error(
          "Unable to process request at this time. Please try again!"
        );
        // process.exit(1);
      }

      // define the tracking key
      // const key = ["::1", "localhost"].includes(req.ip) ? "127.0.0.1" : req.ip;
      const key = req.app.get("app-usermac");
      // console.log("[Redis] key: ", key);

      // fetch records of current user using IP address, returns null when no record is found
      client.get(key, (err, record) => {
        if (err) {
          // console.error(`[Redis] ${err.message}...(${err.name})`);

          // don't throw
          // throw err.name === "AbortError"
          //   ? new Error("Problem in fetching request logs")
          //   : err;
          return next(new Error("Problem in fetching request logs"));
        }

        const currentRequestTime = moment();
        // console.log("[Redis] record: ", key, record);

        //  if no record is found , create a new record for user and store to redis
        if (record == null) {
          const newRecord = [
            {
              requestTimeStamp: currentRequestTime.unix(),
              requestCount: 1,
            },
          ];

          client.set(key, JSON.stringify(newRecord));
          return next();
        }

        // if record is found, parse it's value and calculate number of requests users has made within the last window
        const data = JSON.parse(record) as RateLimitPayload[];

        const windowStartTimestamp = moment()
          .subtract(windowSize, durationUnit!)
          .unix();

        const requestsWithinWindow = data.filter(
          (entry) => entry.requestTimeStamp > windowStartTimestamp
        );
        // console.log("[Redis] reqs-within-window: ", requestsWithinWindow);

        const totalWindowRequestsCount = requestsWithinWindow.reduce(
          (accumulator, entry) => accumulator + entry.requestCount,
          0
        );
        // console.log("[Redis] total-reqs-count: %d\n", totalWindowRequestsCount);

        // if number of requests made is greater than or equal to the desired maximum, return error
        if (totalWindowRequestsCount >= maxWindowRequestCount) {
          return res.status(429).send({
            status: false,
            message: `Throttle limit of requests exceeded!`,
            // message: `Throttle-limit of ${maxWindowRequestCount} requests in ${windowSize} ${durationUnit} exceeded!`,
          });
        } else {
          // if number of requests made is lesser than allowed maximum, log new entry
          const lastRequestLog = data[data.length - 1];
          const potentialCurrentWindowIntervalStartTimeStamp =
            currentRequestTime.subtract(windowLogInterval, durationUnit).unix();
          // console.log("[Redis] last-req-log: ", lastRequestLog);

          //  if interval has not passed since last request log, increment counter
          if (
            lastRequestLog.requestTimeStamp >
            potentialCurrentWindowIntervalStartTimeStamp
          ) {
            lastRequestLog.requestCount++;
            data[data.length - 1] = lastRequestLog;
          } else {
            //  if interval has passed, log new entry for current user and timestamp
            data.push({
              requestTimeStamp: currentRequestTime.unix(),
              requestCount: 1,
            });
          }

          client.set(key, JSON.stringify(data));
          return next();
        }
      });
    } catch (e) {
      return next(e);
    }
  };
};

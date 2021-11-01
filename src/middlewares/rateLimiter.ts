import { NextFunction, Request, Response } from "express";
import { RateLimitDuration } from "../interfaces/rateLimitPayload";
import { mongoDbRateLimiter, redisRateLimiter } from "./rate-limiter";

const {
  RATE_LIMIT_WINDOW_SIZE, // 24 (hours)
  RATE_LIMIT_MAX_WINDOW_REQUEST_COUNT, // 100 (requests)
  RATE_LIMIT_WINDOW_LOG_INTERVAL, // 1 (hours)
  RATE_LIMIT_STORAGE_TYPE = "redis",
  RATE_LIMIT_DURATION_UNIT = RateLimitDuration.MINUTES,

  // urls
  MONGO_DB_STORAGE_URL,
  REDIS_STORAGE_URL,
} = process.env;

// import rateLimit from "express-rate-limit";
// export const rateLimiterUsingThirdParty = rateLimit({
//   windowMs: WINDOW_SIZE_IN_HOURS * 60 * 60 * 1000, // 24 hrs in millseconds
//   max: MAX_WINDOW_REQUEST_COUNT,
//   message: `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_HOURS} hrs limit!`,
//   headers: true,
// });

// make it dynamic to use redis | mongo-db or node-cache
// serves as factory for selected rate-limiter-type

export default (req: Request, res: Response, next: NextFunction) => {
  switch (RATE_LIMIT_STORAGE_TYPE) {
    case "mongodb":
      return mongoDbRateLimiter(
        MONGO_DB_STORAGE_URL!,
        +RATE_LIMIT_WINDOW_SIZE!,
        +RATE_LIMIT_MAX_WINDOW_REQUEST_COUNT!,
        +RATE_LIMIT_WINDOW_LOG_INTERVAL!,
        RATE_LIMIT_DURATION_UNIT
      )(req, res, next);

    case "redis":
      return redisRateLimiter(
        REDIS_STORAGE_URL!,
        +RATE_LIMIT_WINDOW_SIZE!,
        +RATE_LIMIT_MAX_WINDOW_REQUEST_COUNT!,
        +RATE_LIMIT_WINDOW_LOG_INTERVAL!,
        RATE_LIMIT_DURATION_UNIT
      )(req, res, next);

    default:
      return next();
  }
};

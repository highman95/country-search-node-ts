import { NextFunction, Request, Response } from "express";
import { RateLimitDurationUnit } from "../../interfaces/rateLimitPayload";

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
      //     "[Mongo-db] Rate-limit duration is neither hours nor minutes",
      //     durationUnit
      //   );
      //   process.exit(1);
      // }
    } catch (e) {
      return next(e);
    }

    return next();
  };
};

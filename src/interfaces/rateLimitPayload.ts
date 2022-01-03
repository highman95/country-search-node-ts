export type RateLimitPayload = {
  requestTimeStamp: number;
  requestCount: number;
};

export type RateLimitDurationUnit = "hours" | "minutes" | "seconds";

export enum RateLimitDuration {
  HOURS = "hours",
  MINUTES = "minutes",
  SECONDS = "seconds",
}

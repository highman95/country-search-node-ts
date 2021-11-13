export type RateLimitPayload = {
  requestTimeStamp: number;
  requestCount: number;
};

export enum RateLimitDuration {
  HOURS = "hours",
  MINUTES = "minutes",
  SECONDS = "seconds",
}

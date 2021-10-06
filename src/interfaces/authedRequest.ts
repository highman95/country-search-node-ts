import { Request } from "express";

export interface AuthedRequest extends Request {
  username?: string;
}

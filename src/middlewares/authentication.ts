import { NextFunction, Response } from "express";
import {
  JWTPayload,
  TokenExpiredError,
  verifyToken,
} from "../helpers/security";
import { AuthedRequest } from "../interfaces/authedRequest";

export default (req: AuthedRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (authorization && authorization.trim()) {
    try {
      const token = authorization.split(" ")[1];
      if (!token || !token.trim()) {
        throw new Error();
      }

      const decodedToken = verifyToken(token) as JWTPayload;
      req.username = decodedToken.username;
      next();
    } catch (e: any) {
      next(
        new Error(
          `Token is ${
            e.name === TokenExpiredError.name ? "expired" : "invalid"
          }`
        )
      );
    }
  } else {
    next(new Error("Token is required"));
  }
};

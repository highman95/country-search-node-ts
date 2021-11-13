import { NextFunction, Request, Response } from "express";
import {
  JWTPayload,
  TokenExpiredError,
  verifyToken,
} from "../helpers/security";

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  try {
    const [, token] = authorization?.trim().split(" ") ?? "Bearer ";
    if (!token?.trim()) {
      throw new Error("Token is required");
    }

    const { username, mac } = verifyToken(token) as JWTPayload;
    req.app.set("app-username", username);
    req.app.set("app-usermac", mac);
    next();
  } catch (e: any) {
    const message =
      (e?.message ?? "").indexOf("required") !== -1
        ? e.message
        : `Token is ${
            e.name === TokenExpiredError.name ? "expired" : "invalid"
          }`;

    res.status(401).json({ status: false, message });
  }
};

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

// error-handler middleware
const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = (err.message || err.error.message) as string;
  const messageLC = message?.toLowerCase() || "";

  const isBRE = err.name === ReferenceError.name; // bad-reference error
  const isTAE =
    messageLC.indexOf("token") >= 0 &&
    ["required", "invalid", "expired"].some((v) => messageLC.indexOf(v) >= 0);
  message += isTAE ? " (Unauthorized)" : "";

  // client-side (input) error
  const isCSE = [EvalError.name, Error.name, RangeError.name].includes(
    err.name
  );

  res.status(err.code || isBRE ? 404 : isTAE ? 401 : isCSE ? 400 : 500).send({
    status: false,
    message,
  });
};

export default errorHandler;

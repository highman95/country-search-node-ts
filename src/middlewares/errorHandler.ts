import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

// error-handler middleware
const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isBRE = err.name === ReferenceError.name; // bad-reference error
  const isTAE =
    ["token"].includes(err.message.toLowerCase()) &&
    ["missing", "invalid", "expired"].includes(err.message);

  // client-side (input) error
  const isCSE = [EvalError.name, Error.name, RangeError.name].includes(
    err.name
  );

  res.status(err.status || isBRE ? 404 : isTAE ? 401 : isCSE ? 400 : 500).send({
    status: false,
    message: err.message || err.error.message,
  });
};

export default errorHandler;

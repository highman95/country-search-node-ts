import compression from "compression";
import cors from "cors";
import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import helmet from "helmet";
import routes from "./routes";

const app: Application = express(); // create the express-app

app.use(compression()); // compress server-response
app.use(cors()); // handle CORS
app.use(helmet()); // manage security headers

app.use(express.json()); // parse request-body to JSON
app.use(express.urlencoded({ extended: true })); // parse request-body

// register the DB-connection as global variable
// global.db = db;

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

app.use("/api/v1", routes(express.Router()), errorHandler);
export default app;

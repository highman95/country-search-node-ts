import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";

const app: Application = express(); // create the express-app

app.use(compression()); // compress server-response
app.use(cors()); // handle CORS
app.use(helmet()); // manage security headers

app.use(express.json()); // parse request-body to JSON
app.use(express.urlencoded({ extended: true })); // parse request-body

// register the DB-connection as global variable
// global.db = db;
// app.db = db; // req.app.db

app.use("/api/v1", routes(express.Router()), errorHandler);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;

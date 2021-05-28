import { config } from "dotenv";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import chalk from "chalk";
import compression from "compression";
import { info } from "@utils/logger";
import swaggerUi from "swagger-ui-express";
import routes from "./routes";
import ApplyMiddlewares from "./middlewares";
import docs from "./docs";

config({
  path: `.env.${process.env.NODE_ENV}`,
});

class App {
  express: Application;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();

    this.errorHandlers();
  }

  middlewares() {
    this.express.use(
      morgan(
        chalk`{yellow :method} :url {green :status} :response-time ms - :res[content-length]`
      )
    );

    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(compression());
  }

  errorHandlers() {
    ApplyMiddlewares(this.express);
  }

  routes() {
    this.express.use("/api", routes);
    this.express.use("/docs", swaggerUi.serve, swaggerUi.setup(docs));
  }

  listen() {
    this.express.listen(process.env.PORT, () => {
      info(`Server is up and running on port ${process.env.PORT}`);
    });
  }
}

export default new App();

import { config } from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import chalk from "chalk";
import compression from "compression";
import { info } from "@utils/logger";
import { routeImporter } from "@utils/routeImporter";

config({
  path: `.env.${process.env.NODE_ENV}`,
});

class App {
  private express: Application;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.express.use(
      morgan(
        chalk`{yellow :method} :url {green :status} :response-time ms - :res[content-length]`
      )
    );
    this.express.use(express.json());
    this.express.use(compression());
  }

  private routes() {
    this.express.use(routeImporter());
  }

  public listen() {
    this.express.listen(process.env.PORT, () => {
      info(`Server is up and running on port ${process.env.PORT}`);
    });
  }
}

export default new App();

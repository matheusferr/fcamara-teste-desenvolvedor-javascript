import { Application } from "express";
import * as errorhandlers from "./errorHandlers";

function ApplyMiddlewares(app: Application) {
  Object.values(errorhandlers).forEach((handler) => {
    app.use(handler);
  });
}

export default ApplyMiddlewares;

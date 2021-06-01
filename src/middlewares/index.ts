import { Application } from "express";
import * as errorHandlers from "./ErrorHandlers";

function ApplyMiddlewares(app: Application) {
  Object.values(errorHandlers).forEach((handler) => {
    app.use(handler);
  });
}

export default ApplyMiddlewares;

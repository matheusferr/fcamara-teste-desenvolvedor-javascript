import { Request, Response, NextFunction } from "express";
import { InvalidRequest } from "@errors";

export function InvalidRequestHandler(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof InvalidRequest)
    res.status(err.statusCode).send({
      status: "erro",
      mensagem: err.message,
    });
  else next(err);
}

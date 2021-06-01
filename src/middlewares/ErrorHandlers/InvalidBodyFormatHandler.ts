import { Request, Response, NextFunction } from "express";
import { InvalidBodyFormat } from "@errors";

export function InvalidBodyFormatHandler(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof InvalidBodyFormat)
    res.status(err.statusCode).send({
      status: "erro",
      mensagem: err.message,
    });
  else next(err);
}

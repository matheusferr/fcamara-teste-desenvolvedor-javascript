import { Request, Response, NextFunction } from "express";
import { InvalidCpf } from "@errors";

export function InvalidCpfHandler(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof InvalidCpf)
    res.status(err.statusCode).send({
      status: "erro",
      mensagem: err.message,
    });
  else next(err);
}

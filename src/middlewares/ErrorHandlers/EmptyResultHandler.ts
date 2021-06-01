import { Request, Response, NextFunction } from "express";
import { EmptyResultError } from "sequelize";

export function EmptyResultHandler(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof EmptyResultError)
    res.status(404).send({
      status: "erro",
      mensagem: "Recurso não encontrado",
    });
  else next(err);
}

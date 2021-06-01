import { Request, Response, NextFunction } from "express";
import { ForeignKeyConstraintError } from "sequelize";

export function ForeignKeyConstraintHandler(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ForeignKeyConstraintError)
    res.status(400).send({
      status: "erro",
      mensagem: "Relacionamento não encontrado",
    });
  else next(err);
}

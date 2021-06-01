import { Request, Response, NextFunction } from "express";
import { DatabaseError } from "sequelize";

export function DatabaseErrorHandler(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof DatabaseError)
    res.status(500).send({
      status: "erro",
      mensagem: "Erro do servidor",
    });
  else next(err);
}

import { Request, Response, NextFunction } from "express";
import { UniqueConstraintError } from "sequelize";

export function UniqueConstraintHandler(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof UniqueConstraintError) {
    res.status(400).send({
      status: "erro",
      mensagem: "Campos devem ser únicos",
      campos: err.errors.map(({ path }) => path),
    });
  } else next(err);
}

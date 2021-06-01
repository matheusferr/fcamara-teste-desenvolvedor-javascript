import { Request, Response, NextFunction } from "express";
import { ValidationError } from "sequelize";

export function ValidationHandler(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationError) {
    const { path, validatorArgs } = err.errors[0];
    res.status(400).send({
      status: "erro",
      mensagem: `Tamanho do campo ${path} deve ter ${validatorArgs[0]} caracteres`,
    });
  } else next(err);
}

import { Request, Response, NextFunction } from "express";
import { InvalidBodyFormat, InvalidCpf, InvalidRequest } from "@errors";
import {
  UniqueConstraintError,
  ValidationError,
  ForeignKeyConstraintError,
  EmptyResultError,
  DatabaseError,
} from "sequelize";

export function handleInvalidBodyFormat(
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

export function handleInvalidRequest(
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

export function handleInvalidCpf(
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

export function handleUniqueConstraint(
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

export function handleValidation(
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

export function handleForeignKeyConstraint(
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

export function handleEmptyResult(
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

export function handleDatabaseError(
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

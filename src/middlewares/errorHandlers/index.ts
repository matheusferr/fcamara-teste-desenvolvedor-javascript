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
      status: "error",
      message: err.message,
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
      status: "error",
      message: err.message,
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
      status: "error",
      message: err.message,
    });
  else next(err);
}

export function handleUniqueConstraint(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof UniqueConstraintError)
    res.status(400).send({
      status: "error",
      message: `Campo ${err.errors[0].path} deve ser unico`,
    });
  else next(err);
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
      status: "error",
      message: `Tamanho do campo ${path} deve ter ${validatorArgs[0]} caracteres`,
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
      status: "error",
      message: "Relacionamento nao encontrado",
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
      status: "error",
      message: "Recurso nao encontrado",
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
    res.status(400).send({
      status: "error",
      message: "Campos invalidos",
    });
  else next(err);
}

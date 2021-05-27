import { Request, Response, NextFunction } from "express";
import { InvalidBodyFormat, InvalidCpf } from "@errors";
import {
  UniqueConstraintError,
  ValidationError,
  ForeignKeyConstraintError,
  EmptyResultError,
} from "sequelize";

export function handleInvalidBodyFormat(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof InvalidBodyFormat)
    return res.status(err.statusCode).send({
      status: "error",
      message: err.message,
    });

  return next(err);
}

export function handleInvalidCpf(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof InvalidCpf)
    return res.status(err.statusCode).send({
      status: "error",
      message: err.message,
    });

  return next(err);
}

export function handleUniqueConstraint(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof UniqueConstraintError)
    return res.status(400).send({
      status: "error",
      message: err.message,
    });

  return next(err);
}

export function handleValidation(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationError)
    return res.status(400).send({
      status: "error",
      message: err.message,
    });

  return next(err);
}

export function handleForeignKeyConstraint(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ForeignKeyConstraintError)
    return res.status(400).send({
      status: "error",
      message: err.message,
    });

  return next(err);
}

export function handleEmptyResult(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof EmptyResultError)
    return res.status(404).send({
      status: "error",
      message: "recurso nao encontrado",
    });

  return next(err);
}

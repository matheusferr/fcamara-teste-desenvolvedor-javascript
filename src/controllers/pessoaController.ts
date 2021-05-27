/* eslint-disable camelcase */
import { NextFunction, Request, Response } from "express";
import { PessoaDal } from "@dals";
import { RequestValidator, PessoaValidator } from "@validators";
import { getLocation } from "@utils/getLocation";

async function searchByID(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    RequestValidator.validateParamValue(id);

    const pessoa = await PessoaDal.findById(Number(id));

    res.send(pessoa);
  } catch (err) {
    next(err);
  }
}

async function searchByCpf(req: Request, res: Response, next: NextFunction) {
  try {
    const { cpf } = req.query;

    RequestValidator.validateQueryParam(cpf as string, "cpf", req);

    const pessoa = await PessoaDal.findByCpf(cpf as string);

    res.send(pessoa);
  } catch (err) {
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      nome,
      cpf,
      email,
      data_nascimento,
      local_nascimento,
      nome_mae,
      nome_pai,
    } = req.body;

    const payload = {
      nome,
      cpf,
      email,
      data_nascimento,
      local_nascimento,
      nome_mae,
      nome_pai,
    };

    PessoaValidator.validateCreateAttr(payload);

    const pessoa = await PessoaDal.create(payload);

    res.location(getLocation(req, "pessoa", pessoa.id));
    res.status(201).send(pessoa);
  } catch (err) {
    next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    RequestValidator.validateParamValue(id);

    const {
      nome,
      cpf,
      email,
      data_nascimento,
      local_nascimento,
      nome_mae,
      nome_pai,
    } = req.body;

    const payload = {
      nome,
      cpf,
      email,
      data_nascimento,
      local_nascimento,
      nome_mae,
      nome_pai,
    };

    PessoaValidator.validateUpdateAttr(payload);

    const pessoa = await PessoaDal.update(Number(id), payload);

    res.send(pessoa);
  } catch (err) {
    next(err);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    RequestValidator.validateParamValue(id);

    await PessoaDal.destroy(Number(id));

    res.send({ status: "ok" });
  } catch (err) {
    next(err);
  }
}

export { searchByID, searchByCpf, create, update, destroy };

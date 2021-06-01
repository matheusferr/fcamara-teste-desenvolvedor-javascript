/* eslint-disable camelcase */
import { Request, Response, NextFunction } from "express";
import { CidadeDal } from "@dals";
import { RequestValidator, CidadeValidator } from "@validators";
import { getLocation } from "@utils/getLocation";

async function index(req: Request, res: Response) {
  const cidades = await CidadeDal.findAll();

  res.send(cidades);
}

async function searchByID(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    RequestValidator.validateParamValue(id);

    const cidade = await CidadeDal.findById(id);

    res.send(cidade);
  } catch (err) {
    next(err);
  }
}

async function searchByNome(req: Request, res: Response, next: NextFunction) {
  try {
    const { nome } = req.query;

    RequestValidator.validateQueryParam(nome as string, "nome", req);

    const cidade = await CidadeDal.findByNome(nome as string);

    res.send(cidade);
  } catch (err) {
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { nome, id_estado } = req.body;

    CidadeValidator.validateCreateAttr({ nome, id_estado });

    const cidade = await CidadeDal.create({ nome, id_estado });

    res.location(getLocation(req, "cidade", cidade.id));
    res.status(201).send(cidade);
  } catch (err) {
    next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    RequestValidator.validateParamValue(id);

    const { nome, id_estado } = req.body;

    CidadeValidator.validateUpdateAttr({ nome, id_estado });

    const cidade = await CidadeDal.update(id, { nome, id_estado });

    res.send(cidade);
  } catch (err) {
    next(err);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    RequestValidator.validateParamValue(id);

    await CidadeDal.destroy(id);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export { index, searchByID, searchByNome, create, update, destroy };

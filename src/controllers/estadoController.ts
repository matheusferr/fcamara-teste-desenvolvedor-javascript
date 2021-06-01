/* eslint-disable camelcase */
import { Request, Response, NextFunction } from "express";
import { EstadoDal } from "@dals";
import { RequestValidator, EstadoValidator } from "@validators";
import { getLocation } from "@utils/getLocation";

async function index(req: Request, res: Response) {
  const estados = await EstadoDal.findAll();

  res.send(estados);
}

async function searchByID(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    RequestValidator.validateParamValue(id);

    const estado = await EstadoDal.findById(id);

    res.send(estado);
  } catch (err) {
    next(err);
  }
}

async function searchBySigla(req: Request, res: Response, next: NextFunction) {
  try {
    const { sigla } = req.query;

    RequestValidator.validateQueryParam(sigla as string, "sigla", req);

    const estado = await EstadoDal.findBySigla(sigla as string);

    res.send(estado);
  } catch (err) {
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { sigla, id_pais } = req.body;

    EstadoValidator.validateCreateAttr({ sigla, id_pais });

    const estado = await EstadoDal.create({ sigla, id_pais });

    res.location(getLocation(req, "estado", estado.id));
    res.status(201).send(estado);
  } catch (err) {
    next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    RequestValidator.validateParamValue(id);

    const { sigla, id_pais } = req.body;

    EstadoValidator.validateCreateAttr({ sigla, id_pais });

    const estado = await EstadoDal.update(id, { sigla, id_pais });

    res.send(estado);
  } catch (err) {
    next(err);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    RequestValidator.validateParamValue(id);

    await EstadoDal.destroy(id);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export { index, searchByID, searchBySigla, create, update, destroy };

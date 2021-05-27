import { NextFunction, Request, Response } from "express";
import { PaisDal } from "@dals";
import { RequestValidator } from "@validators";

async function index(req: Request, res: Response) {
  const paises = await PaisDal.findAll();

  res.send(paises);
}

async function searchByID(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    RequestValidator.validateParamValue(id);

    const pais = await PaisDal.findById(Number(id));

    res.send(pais);
  } catch (err) {
    next(err);
  }
}

async function searchBySigla(req: Request, res: Response, next: NextFunction) {
  try {
    const { sigla } = req.query;

    RequestValidator.validateQueryParam(sigla as string, "sigla", req);

    const pais = await PaisDal.findBySigla(sigla as string);

    res.send(pais);
  } catch (err) {
    next(err);
  }
}

export { index, searchByID, searchBySigla };

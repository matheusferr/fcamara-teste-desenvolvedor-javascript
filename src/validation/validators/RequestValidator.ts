import { Request } from "express";
import { InvalidRequest } from "../errors";

export class RequestValidator {
  static validateParamValue(param: string) {
    if (Number.isNaN(param)) throw new InvalidRequest("ID invalido");
  }

  static validateQueryParam(query: string, expectedKey: string, req: Request) {
    if (!query || !Object.keys(req.query).includes(expectedKey))
      throw new InvalidRequest("Filtro invalido");
  }
}

import { InvalidRequest } from "../errors";

export class RequestValidator {
  static validateParamValue(param: string) {
    if (Number.isNaN(param)) throw new InvalidRequest("ID invalido");
  }

  static validateQueryParam(query: string) {
    if (!query) throw new InvalidRequest("Filtro invalido");
  }
}

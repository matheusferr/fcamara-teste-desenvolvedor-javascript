import {
  EstadoCreationAttr,
  EstadoUpdateAttr,
} from "src/database/models/Estado";

import { InvalidBodyFormat } from "../errors";

export class EstadoValidator {
  static validateCreateAttr(payload: EstadoCreationAttr) {
    if (!payload.sigla || !payload.id_pais) throw new InvalidBodyFormat();
  }

  static validateUpdateAttr(payload: EstadoUpdateAttr) {
    if (!payload.sigla && !payload.id_pais) throw new InvalidBodyFormat();
  }
}

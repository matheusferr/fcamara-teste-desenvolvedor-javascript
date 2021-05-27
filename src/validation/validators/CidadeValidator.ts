import {
  CidadeCreationAttr,
  CidadeUpdateAttr,
} from "src/database/models/Cidade";

import { InvalidBodyFormat } from "../errors";

export class CidadeValidator {
  static validateCreateAttr(payload: CidadeCreationAttr) {
    if (!payload.nome || !payload.id_estado) throw new InvalidBodyFormat();
  }

  static validateUpdateAttr(payload: CidadeUpdateAttr) {
    if (!payload.nome && !payload.id_estado) throw new InvalidBodyFormat();
  }
}

import { PaisCreationAttr } from "../../models/Pais";

export interface PaisDalDef {
  findAll(): Promise<PaisCreationAttr[]>;
  findById(id: string | number): Promise<PaisCreationAttr>;
  findBySigla(sigla: string): Promise<PaisCreationAttr>;
}

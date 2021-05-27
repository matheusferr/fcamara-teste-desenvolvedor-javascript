import { PaisCreationAttr } from "../../models/Pais";

export interface PaisDalDef {
  findAll(): Promise<PaisCreationAttr[]>;
  findById(id: number): Promise<PaisCreationAttr>;
  findBySigla(sigla: string): Promise<PaisCreationAttr>;
}

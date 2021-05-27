import { CidadeCreationAttr, CidadeUpdateAttr } from "../../models/Cidade";

export interface CidadeDalDef {
  create(payload: CidadeCreationAttr): Promise<CidadeCreationAttr>;
  findById(id: number): Promise<CidadeCreationAttr>;
  findByNome(sigla: string): Promise<CidadeCreationAttr>;
  update(id: number, payload: CidadeUpdateAttr): Promise<CidadeCreationAttr>;
  destroy(id: number): Promise<void>;
}

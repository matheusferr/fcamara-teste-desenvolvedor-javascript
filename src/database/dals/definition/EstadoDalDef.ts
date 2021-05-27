import { EstadoCreationAttr, EstadoUpdateAttr } from "../../models/Estado";

export interface EstadoDalDef {
  create(payload: EstadoCreationAttr): Promise<EstadoCreationAttr>;
  findById(id: number): Promise<EstadoCreationAttr>;
  findBySigla(sigla: string): Promise<EstadoCreationAttr>;
  update(id: number, payload: EstadoUpdateAttr): Promise<EstadoCreationAttr>;
  destroy(id: number): Promise<void>;
}

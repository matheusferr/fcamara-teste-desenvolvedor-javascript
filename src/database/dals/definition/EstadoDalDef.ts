import { EstadoCreationAttr, EstadoUpdateAttr } from "../../models/Estado";

type DetailedSearchResult = Omit<EstadoCreationAttr, "id_pais"> & {
  pais: string;
};

export interface EstadoDalDef {
  create(payload: EstadoCreationAttr): Promise<EstadoCreationAttr>;
  findAll(): Promise<DetailedSearchResult[]>;
  findById(id: string | number): Promise<EstadoCreationAttr>;
  findBySigla(sigla: string): Promise<EstadoCreationAttr>;
  update(
    id: string | number,
    payload: EstadoUpdateAttr
  ): Promise<EstadoCreationAttr>;
  destroy(id: string | number): Promise<void>;
}

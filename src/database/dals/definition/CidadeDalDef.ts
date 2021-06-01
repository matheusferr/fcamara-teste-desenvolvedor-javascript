import { CidadeCreationAttr, CidadeUpdateAttr } from "../../models/Cidade";

type DetailedSearchResult = Omit<CidadeCreationAttr, "id_estado"> & {
  estado: string;
};

export interface CidadeDalDef {
  create(payload: CidadeCreationAttr): Promise<CidadeCreationAttr>;
  findAll(): Promise<DetailedSearchResult[]>;
  findById(id: string | number): Promise<DetailedSearchResult>;
  findByNome(sigla: string): Promise<DetailedSearchResult>;
  update(id: number, payload: CidadeUpdateAttr): Promise<CidadeCreationAttr>;
  destroy(id: number): Promise<void>;
}

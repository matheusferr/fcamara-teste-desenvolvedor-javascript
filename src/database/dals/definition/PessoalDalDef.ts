/* eslint-disable camelcase */
import { PessoaCreationAttr, PessoaUpdateAttr } from "../../models/Pessoa";

type DetailedSearchResults = Omit<PessoaCreationAttr, "local_nascimento">;

export interface PessoaDalDef {
  create(payload: PessoaCreationAttr): Promise<PessoaCreationAttr>;
  findById(id: number): Promise<DetailedSearchResults>;
  findByCpf(cpf: string): Promise<DetailedSearchResults>;
  update(id: number, payload: PessoaUpdateAttr): Promise<PessoaCreationAttr>;
  destroy(id: number): Promise<void>;
}

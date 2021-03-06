/* eslint-disable camelcase */
import { PessoaCreationAttr, PessoaUpdateAttr } from "../../models/Pessoa";

type DetailedSearchResults = Omit<PessoaCreationAttr, "local_nascimento">;

export interface PessoaDalDef {
  create(payload: PessoaCreationAttr): Promise<PessoaCreationAttr>;
  findById(id: string | number): Promise<DetailedSearchResults>;
  findByCpf(cpf: string): Promise<DetailedSearchResults>;
  update(
    id: string | number,
    payload: PessoaUpdateAttr
  ): Promise<PessoaCreationAttr>;
  destroy(id: string | number): Promise<void>;
}

/* eslint-disable class-methods-use-this */
import { PessoaDalDef } from "../definition";
import Pessoa, {
  PessoaCreationAttr,
  PessoaUpdateAttr,
} from "../../models/Pessoa";

class PessoaDalImpl implements PessoaDalDef {
  async create(payload: PessoaCreationAttr) {
    const pessoa = await Pessoa.create(payload);

    return {
      id: pessoa.id,
      nome: pessoa.nome,
      cpf: pessoa.cpf,
      email: pessoa.email,
      data_nascimento: pessoa.data_nascimento,
      local_nascimento: pessoa.local_nascimento,
      nome_mae: pessoa.nome_mae,
      nome_pai: pessoa.nome_pai,
    };
  }

  async findById(id: string | number) {
    const pessoa = await Pessoa.findByPk(Number(id), {
      rejectOnEmpty: true,
      include: [
        {
          association: "cidadePessoa",
          attributes: { exclude: ["id", "id_estado"] },
          include: [
            {
              association: "estadoCidade",
              attributes: { exclude: ["id"] },
              include: [
                {
                  association: "paisEstado",
                  attributes: { exclude: ["id"] },
                },
              ],
            },
          ],
        },
      ],
    });

    // @ts-ignore
    const nomeCidade = pessoa.cidadePessoa.nome;
    // @ts-ignore
    const estadoCidade = pessoa.cidadePessoa.estadoCidade.sigla;
    // @ts-ignore
    const paisEstado = pessoa.cidadePessoa.estadoCidade.paisEstado.sigla;

    // eslint-disable-next-line camelcase
    const local_nascimento = `${nomeCidade} - ${estadoCidade}, ${paisEstado}`;

    return {
      id: pessoa.id,
      nome: pessoa.nome,
      cpf: pessoa.cpf,
      email: pessoa.email,
      data_nascimento: pessoa.data_nascimento,
      local_nascimento,
      nome_mae: pessoa.nome_mae,
      nome_pai: pessoa.nome_pai,
    };
  }

  async findByCpf(cpf: string) {
    const pessoa = await Pessoa.findOne({
      where: { cpf },
      rejectOnEmpty: true,
      include: [
        {
          association: "cidadePessoa",
          attributes: { include: ["id", "id_estado"] },
          include: [
            {
              association: "estadoCidade",
              attributes: { exclude: ["id"] },
              include: [
                {
                  association: "paisEstado",
                  attributes: { exclude: ["id"] },
                },
              ],
            },
          ],
        },
      ],
    });

    // @ts-ignore
    const nomeCidade = pessoa.cidadePessoa.nome;
    // @ts-ignore
    const estadoCidade = pessoa.cidadePessoa.estadoCidade.sigla;
    // @ts-ignore
    const paisEstado = pessoa.cidadePessoa.estadoCidade.paisEstado.sigla;

    // eslint-disable-next-line camelcase
    const local_nascimento = `${nomeCidade} - ${estadoCidade}, ${paisEstado}`;

    return {
      id: pessoa.id,
      nome: pessoa.nome,
      cpf: pessoa.cpf,
      email: pessoa.email,
      data_nascimento: pessoa.data_nascimento,
      local_nascimento,
      nome_mae: pessoa.nome_mae,
      nome_pai: pessoa.nome_pai,
    };
  }

  async update(id: string | number, payload: PessoaUpdateAttr) {
    const pessoa = await Pessoa.findByPk(Number(id), {
      rejectOnEmpty: true,
    });

    pessoa.nome = payload.nome || pessoa.nome;
    pessoa.cpf = payload.cpf || pessoa.cpf;
    pessoa.email = payload.email || pessoa.email;
    pessoa.local_nascimento =
      payload.local_nascimento || pessoa.local_nascimento;
    pessoa.data_nascimento = payload.data_nascimento || pessoa.data_nascimento;
    pessoa.nome_mae = payload.nome_mae || pessoa.nome_mae;
    pessoa.nome_pai = payload.nome_pai || pessoa.nome_pai;

    await pessoa.save();

    return {
      id: pessoa.id,
      nome: pessoa.nome,
      cpf: pessoa.cpf,
      email: pessoa.email,
      data_nascimento: pessoa.data_nascimento,
      local_nascimento: pessoa.local_nascimento,
      nome_mae: pessoa.nome_mae,
      nome_pai: pessoa.nome_pai,
    };
  }

  async destroy(id: string | number) {
    await Pessoa.findByPk(id, {
      rejectOnEmpty: true,
    });

    await Pessoa.destroy({ where: { id } });
  }
}

export const PessoaDal = new PessoaDalImpl();

/* eslint-disable class-methods-use-this */
import { CidadeDalDef } from "../definition";
import Cidade, {
  CidadeCreationAttr,
  CidadeUpdateAttr,
} from "../../models/Cidade";

class CidadeDalImpl implements CidadeDalDef {
  async create(payload: CidadeCreationAttr) {
    const cidade = await Cidade.create(payload);

    return {
      id: cidade.id,
      nome: cidade.nome,
      id_estado: cidade.id_estado,
    };
  }

  async findAll() {
    const cidades = await Cidade.findAll({
      include: [
        {
          association: "estadoCidade",
          attributes: { exclude: ["id", "id_pais"] },
        },
      ],
    });

    return cidades.map((cidade) => ({
      id: cidade.id,
      nome: cidade.nome,
      // @ts-ignore
      estado: cidade.estadoCidade.sigla,
    }));
  }

  async findById(id: string | number) {
    const cidade = await Cidade.findByPk(Number(id), {
      rejectOnEmpty: true,
      include: [
        {
          association: "estadoCidade",
          attributes: { exclude: ["id", "id_pais"] },
        },
      ],
    });

    return {
      id: cidade.id,
      nome: cidade.nome,
      // @ts-ignore
      estado: cidade.estadoCidade.sigla,
    };
  }

  async findByNome(nome: string) {
    const cidade = await Cidade.findOne({
      where: {
        nome: nome.toUpperCase(),
      },
      rejectOnEmpty: true,
      include: [
        {
          association: "estadoCidade",
          attributes: { exclude: ["id", "id_pais"] },
        },
      ],
    });

    return {
      id: cidade.id,
      nome: cidade.nome,
      // @ts-ignore
      estado: cidade.estadoCidade.sigla,
    };
  }

  async update(id: string | number, payload: CidadeUpdateAttr) {
    const cidade = await Cidade.findByPk(id, {
      rejectOnEmpty: true,
    });

    cidade.nome = payload.nome || cidade.nome;
    cidade.id_estado = payload.id_estado || cidade.id_estado;

    await cidade.save();

    return {
      id: cidade.id,
      nome: cidade.nome,
      id_estado: cidade.id_estado,
    };
  }

  async destroy(id: string | number) {
    await Cidade.findByPk(Number(id), {
      rejectOnEmpty: true,
    });

    await Cidade.destroy({ where: { id } });
  }
}

export const CidadeDal = new CidadeDalImpl();

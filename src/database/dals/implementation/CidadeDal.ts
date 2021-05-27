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

  async findById(id: number) {
    const cidade = await Cidade.findByPk(id, {
      rejectOnEmpty: true,
    });

    return {
      id: cidade.id,
      nome: cidade.nome,
      id_estado: cidade.id_estado,
    };
  }

  async findByNome(nome: string) {
    const cidade = await Cidade.findOne({
      where: {
        nome,
      },
      rejectOnEmpty: true,
    });

    return {
      id: cidade.id,
      nome: cidade.nome,
      id_estado: cidade.id_estado,
    };
  }

  async update(id: number, payload: CidadeUpdateAttr) {
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

  async destroy(id: number) {
    await Cidade.findByPk(id, {
      rejectOnEmpty: true,
    });

    await Cidade.destroy({ where: { id } });
  }
}

export const CidadeDal = new CidadeDalImpl();

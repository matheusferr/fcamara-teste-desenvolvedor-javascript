/* eslint-disable class-methods-use-this */
import { EstadoDalDef } from "../definition";
import Estado, {
  EstadoCreationAttr,
  EstadoUpdateAttr,
} from "../../models/Estado";

class EstadoDalImpl implements EstadoDalDef {
  async create(payload: EstadoCreationAttr) {
    const estado = await Estado.create(payload);

    return {
      id: estado.id,
      sigla: estado.sigla,
      id_pais: estado.id_pais,
    };
  }

  async findById(id: number) {
    const estado = await Estado.findByPk(id, {
      rejectOnEmpty: true,
    });

    return {
      id: estado.id,
      sigla: estado.sigla,
      id_pais: estado.id_pais,
    };
  }

  async findBySigla(sigla: string) {
    const estado = await Estado.findOne({
      where: {
        sigla,
      },
      rejectOnEmpty: true,
    });

    return {
      id: estado.id,
      sigla: estado.sigla,
      id_pais: estado.id_pais,
    };
  }

  async update(id: number, payload: EstadoUpdateAttr) {
    const estado = await Estado.findByPk(id, {
      rejectOnEmpty: true,
    });

    estado.sigla = payload.sigla || estado.sigla;
    estado.id_pais = payload.id_pais || estado.id_pais;

    await estado.save();

    return {
      id: estado.id,
      sigla: estado.sigla,
      id_pais: estado.id_pais,
    };
  }

  async destroy(id: number) {
    await Estado.findByPk(id, {
      rejectOnEmpty: true,
    });

    await Estado.destroy({ where: { id } });
  }
}

export const EstadoDal = new EstadoDalImpl();

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

  async findAll() {
    const estados = await Estado.findAll({
      include: [
        {
          association: "paisEstado",
          attributes: { exclude: ["id"] },
        },
      ],
    });

    return estados.map((estado) => ({
      id: estado.id,
      sigla: estado.sigla,
      // @ts-ignore
      pais: estado.paisEstado.sigla,
    }));
  }

  async findById(id: string | number) {
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
        sigla: sigla.toUpperCase(),
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

    estado.sigla = payload.sigla?.toUpperCase() || estado.sigla;
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

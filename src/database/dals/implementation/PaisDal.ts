/* eslint-disable class-methods-use-this */
import { Pais } from "@models";
import { PaisDalDef } from "../definition";

class PaisDalImpl implements PaisDalDef {
  async findAll() {
    const paises = await Pais.findAll();

    return paises.map((pais) => ({
      id: pais.id,
      sigla: pais.sigla,
    }));
  }

  async findById(id: number) {
    const pais = await Pais.findByPk(id, {
      rejectOnEmpty: true,
    });

    return {
      id: pais.id,
      sigla: pais.sigla,
    };
  }

  async findBySigla(sigla: string) {
    const pais = await Pais.findOne({
      where: {
        sigla: sigla.toUpperCase(),
      },
      rejectOnEmpty: true,
    });

    return {
      id: pais.id,
      sigla: pais.sigla,
    };
  }
}

export const PaisDal = new PaisDalImpl();

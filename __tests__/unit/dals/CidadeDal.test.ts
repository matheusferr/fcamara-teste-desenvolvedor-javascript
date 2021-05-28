import { EmptyResultError } from "sequelize";
import faker from "faker";
import { Pais, Estado } from "@models";
import { CidadeDal } from "@dals";
import { truncate } from "../../utils";

describe("CidadeDal", () => {
  beforeEach(async () => {
    await truncate();

    const country = await Pais.create({
      sigla: faker.address.countryCode(),
    });

    await Estado.create({
      sigla: faker.address.stateAbbr(),
      id_pais: country.id,
    });
  });

  it("should create a city", async () => {
    const city = await CidadeDal.create({
      nome: faker.address.cityName(),
      id_estado: 1,
    });

    expect(city.id).toBe(1);
  });

  it("should update a state", async () => {
    const city = await CidadeDal.create({
      nome: faker.address.cityName(),
      id_estado: 1,
    });

    const updatedCity = await CidadeDal.update(city.id, {
      nome: faker.address.cityName(),
    });

    expect(city.nome).not.toEqual(updatedCity.nome);
  });

  it("should delete a state", async () => {
    const city = await CidadeDal.create({
      nome: faker.address.cityName(),
      id_estado: 1,
    });

    await expect(CidadeDal.destroy(city.id)).resolves.not.toThrow(
      EmptyResultError
    );
  });

  it("should not delete a non-existing person", async () => {
    await CidadeDal.create({
      nome: faker.address.cityName(),
      id_estado: 1,
    });

    await expect(CidadeDal.destroy(2)).rejects.toThrow(EmptyResultError);
  });
});

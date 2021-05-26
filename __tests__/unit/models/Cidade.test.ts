import { UniqueConstraintError, ForeignKeyConstraintError } from "sequelize";
import faker from "faker";
import { Pais, Estado, Cidade } from "@models";
import { truncate } from "../../utils";

describe("Table Cidade", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should create a city", async () => {
    const country = await Pais.create({
      sigla: faker.address.countryCode(),
    });

    const state = await Estado.create({
      sigla: faker.address.stateAbbr(),
      id_pais: country.id,
    });

    const city = await Cidade.create({
      nome: faker.address.cityName(),
      id_estado: state.id,
    });

    expect(city.id).toBe(1);
  });

  it("should respect unique constraint in field nome", async () => {
    const country = await Pais.create({
      sigla: faker.address.countryCode(),
    });

    const state = await Estado.create({
      sigla: faker.address.stateAbbr(),
      id_pais: country.id,
    });

    const nome = faker.address.cityName();

    await Cidade.create({
      nome,
      id_estado: state.id,
    });

    await expect(
      Cidade.create({
        nome,
        id_estado: state.id,
      })
    ).rejects.toThrow(UniqueConstraintError);
  });

  it("should respect foreign key constraint", async () => {
    await expect(
      Cidade.create({
        nome: faker.address.cityName(),
        id_estado: 2,
      })
    ).rejects.toThrow(ForeignKeyConstraintError);
  });
});

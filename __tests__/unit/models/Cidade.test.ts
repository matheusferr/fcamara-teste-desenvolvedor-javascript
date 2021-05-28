import { UniqueConstraintError, ForeignKeyConstraintError } from "sequelize";
import faker from "faker";
import { Pais, Estado, Cidade } from "@models";
import { truncate } from "../../utils";

describe("Table Cidade", () => {
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
    const city = await Cidade.create({
      nome: faker.address.cityName(),
      id_estado: 1,
    });

    expect(city.id).toBe(1);
  });

  it("should respect unique constraint in field nome", async () => {
    const nome = faker.address.cityName();

    await Cidade.create({
      nome,
      id_estado: 1,
    });

    await expect(
      Cidade.create({
        nome,
        id_estado: 1,
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

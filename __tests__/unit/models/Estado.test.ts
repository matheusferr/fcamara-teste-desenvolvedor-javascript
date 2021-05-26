import {
  UniqueConstraintError,
  DatabaseError,
  ForeignKeyConstraintError,
} from "sequelize";
import faker from "faker";
import { Pais, Estado } from "@models";
import { truncate } from "../../utils";

describe("Table Estado", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should create a state", async () => {
    const country = await Pais.create({
      sigla: faker.address.countryCode(),
    });

    const state = await Estado.create({
      sigla: faker.address.stateAbbr(),
      id_pais: country.id,
    });

    expect(state.id).toBe(1);
  });

  it("should respect unique constraint in field sigla", async () => {
    const country = await Pais.create({
      sigla: faker.address.countryCode(),
    });

    const sigla = faker.address.stateAbbr();

    await Estado.create({
      sigla,
      id_pais: country.id,
    });

    await expect(
      Estado.create({
        sigla,
        id_pais: country.id,
      })
    ).rejects.toThrow(UniqueConstraintError);
  });

  it("should respect foreign key constraint", async () => {
    await expect(
      Estado.create({
        sigla: faker.address.stateAbbr(),
        id_pais: 2,
      })
    ).rejects.toThrow(ForeignKeyConstraintError);
  });

  it("should validate field sigla", async () => {
    const country = await Pais.create({
      sigla: faker.address.countryCode(),
    });

    await expect(
      Estado.create({
        sigla: "ABC",
        id_pais: country.id,
      })
    ).rejects.toThrow(DatabaseError);
  });
});

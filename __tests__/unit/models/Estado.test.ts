import {
  UniqueConstraintError,
  ValidationError,
  ForeignKeyConstraintError,
} from "sequelize";
import faker from "faker";
import { Pais, Estado } from "@models";
import { truncate } from "../../utils";

describe("Table Estado", () => {
  beforeEach(async () => {
    await truncate();
    await Pais.create({
      sigla: faker.address.countryCode(),
    });
  });

  it("should create a state", async () => {
    const state = await Estado.create({
      sigla: faker.address.stateAbbr(),
      id_pais: 1,
    });

    expect(state.id).toBe(1);
  });

  it("should respect unique constraint in field sigla", async () => {
    const sigla = faker.address.stateAbbr();

    await Estado.create({
      sigla,
      id_pais: 1,
    });

    await expect(
      Estado.create({
        sigla,
        id_pais: 1,
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
    await expect(
      Estado.create({
        sigla: "ABC",
        id_pais: 1,
      })
    ).rejects.toThrow(ValidationError);
  });
});

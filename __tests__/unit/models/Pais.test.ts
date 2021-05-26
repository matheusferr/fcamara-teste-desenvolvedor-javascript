import { UniqueConstraintError, DatabaseError } from "sequelize";
import faker from "faker";
import { Pais } from "@models";
import { truncate } from "../../utils";

describe("Table País", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should create a country", async () => {
    const country = await Pais.create({
      sigla: faker.address.countryCode(),
    });

    expect(country.id).toBe(1);
  });

  it("should respect unique constraint in field sigla", async () => {
    const sigla = faker.address.countryCode();

    await Pais.create({
      sigla,
    });

    await expect(
      Pais.create({
        sigla,
      })
    ).rejects.toThrow(UniqueConstraintError);
  });

  it("should validate field sigla", async () => {
    await expect(
      Pais.create({
        sigla: "ABC",
      })
    ).rejects.toThrow(DatabaseError);
  });
});

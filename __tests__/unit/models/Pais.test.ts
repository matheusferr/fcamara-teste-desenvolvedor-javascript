import { UniqueConstraintError, ValidationError } from "sequelize";
import faker from "faker";
import { PaisInstance } from "src/database/models/Pais";
import factory from "../../factory";
import { truncate } from "../../utils";

describe("Table País", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should create a country", async () => {
    const country = await factory.create<PaisInstance>("Pais");

    expect(country.id).toBe(1);
  });

  it("should respect unique constraint in field sigla", async () => {
    const sigla = faker.address.countryCode();

    await factory.create("Pais", { sigla });

    await expect(factory.create("Pais", { sigla })).rejects.toThrow(
      UniqueConstraintError
    );
  });

  it("should validate field sigla", async () => {
    await expect(factory.create("Pais", { sigla: "abc" })).rejects.toThrow(
      ValidationError
    );
  });
});

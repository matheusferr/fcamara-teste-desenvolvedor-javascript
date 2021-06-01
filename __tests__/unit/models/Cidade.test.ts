import { UniqueConstraintError, ForeignKeyConstraintError } from "sequelize";
import { CidadeInstance } from "src/database/models/Cidade";
import factory from "../../factory";
import { truncate } from "../../utils";

describe("Table Cidade", () => {
  beforeEach(async () => {
    await truncate();

    await factory.create("Pais");
    await factory.create("Estado");
  });

  it("should create a city", async () => {
    const city = await factory.create<CidadeInstance>("Cidade");

    expect(city.id).toBe(1);
  });

  it("should respect unique constraint", async () => {
    await factory.create("Cidade", { nome: "santos", id_estado: 1 });

    await expect(
      factory.create("Cidade", { nome: "santos", id_estado: 1 })
    ).rejects.toThrow(UniqueConstraintError);
  });

  it("should respect foreign key constraint", async () => {
    await expect(
      factory.create("Cidade", { nome: "santos", id_estado: 3 })
    ).rejects.toThrow(ForeignKeyConstraintError);
  });
});

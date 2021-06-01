import {
  UniqueConstraintError,
  ValidationError,
  ForeignKeyConstraintError,
} from "sequelize";
import { EstadoInstance } from "src/database/models/Estado";
import factory from "../../factory";
import { truncate } from "../../utils";

describe("Table Estado", () => {
  beforeEach(async () => {
    await truncate();

    await factory.create("Pais");
  });

  it("should create a state", async () => {
    const state = await factory.create<EstadoInstance>("Estado");

    expect(state.id).toBe(1);
  });

  it("should respect unique constraint in field sigla", async () => {
    await factory.create<EstadoInstance>("Estado", { sigla: "sp" });

    await expect(
      factory.create<EstadoInstance>("Estado", { sigla: "sp" })
    ).rejects.toThrow(UniqueConstraintError);
  });

  it("should respect foreign key constraint", async () => {
    await expect(
      factory.create<EstadoInstance>("Estado", { id_pais: 6 })
    ).rejects.toThrow(ForeignKeyConstraintError);
  });

  it("should respect unique key constraint", async () => {
    await factory.create<EstadoInstance>("Estado", { sigla: "sp" });

    await expect(
      factory.create<EstadoInstance>("Estado", { sigla: "sp" })
    ).rejects.toThrow(UniqueConstraintError);
  });

  it("should validate field sigla", async () => {
    await expect(
      factory.create<EstadoInstance>("Estado", { sigla: "abc" })
    ).rejects.toThrow(ValidationError);
  });
});

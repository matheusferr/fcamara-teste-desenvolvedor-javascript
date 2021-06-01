import { EmptyResultError } from "sequelize";
import { EstadoDal } from "@dals";
import { EstadoInstance } from "src/database/models/Estado";
import factory from "../../factory";
import { truncate } from "../../utils";

describe("EstadoDal", () => {
  beforeEach(async () => {
    await truncate();

    await factory.create("Pais");
  });

  it("should list all states", async () => {
    await EstadoDal.create(await factory.attrs("Estado"));
    const states = await EstadoDal.findAll();

    expect(states).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
        }),
      ])
    );
  });

  it("should find a state by its ID", async () => {
    const attrs = await factory.attrs<EstadoInstance>("Estado");

    await EstadoDal.create(attrs);

    const state = await EstadoDal.findById(1);

    expect(state.sigla).toEqual(attrs.sigla);
  });

  it("should find a state by its abbr", async () => {
    const attrs = await factory.attrs<EstadoInstance>("Estado");

    await EstadoDal.create(attrs);

    const state = await EstadoDal.findBySigla(attrs.sigla);

    expect(state.id).toEqual(1);
    expect(state.sigla).toEqual(attrs.sigla);
  });

  it("should create a state", async () => {
    const attrs = await factory.attrs<EstadoInstance>("Estado");
    const estado = await EstadoDal.create(attrs);

    expect(estado.id).toBe(1);
    expect(estado.sigla).toBe(attrs.sigla);
  });

  it("should update a state", async () => {
    const attrs = await factory.attrs<EstadoInstance>("Estado", {
      sigla: "sp",
    });

    const estado = await EstadoDal.create(attrs);

    const estadoAtualizado = await EstadoDal.update(estado.id, {
      sigla: "rr",
    });

    expect(estado.id).toBe(1);
    expect(estado.sigla).not.toEqual(estadoAtualizado.sigla);
  });

  it("should delete a state", async () => {
    const estado = await EstadoDal.create(await factory.attrs("Estado"));

    await expect(EstadoDal.destroy(estado.id)).resolves.not.toThrow(
      EmptyResultError
    );
  });

  it("should not delete a non-existing person", async () => {
    await EstadoDal.create(await factory.attrs("Estado"));

    await expect(EstadoDal.destroy(2)).rejects.toThrow(EmptyResultError);
  });
});

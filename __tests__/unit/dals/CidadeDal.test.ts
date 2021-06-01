import { EmptyResultError } from "sequelize";
import { CidadeDal } from "@dals";
import { CidadeInstance } from "src/database/models/Cidade";
import factory from "../../factory";
import { truncate } from "../../utils";

describe("CidadeDal", () => {
  beforeEach(async () => {
    await truncate();

    await factory.create("Pais");
    await factory.create("Estado");
  });

  it("should list all cities", async () => {
    await CidadeDal.create(await factory.attrs("Cidade"));
    const cities = await CidadeDal.findAll();

    expect(cities).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
        }),
      ])
    );
  });

  it("should find a city by its ID", async () => {
    const attrs = await factory.attrs<CidadeInstance>("Cidade");

    await CidadeDal.create(attrs);

    const city = await CidadeDal.findById(1);

    expect(city.nome).toEqual(attrs.nome);
  });

  it("should find a city by its name", async () => {
    const attrs = await factory.attrs<CidadeInstance>("Cidade");

    await CidadeDal.create(attrs);

    const city = await CidadeDal.findByNome(attrs.nome);

    expect(city.id).toEqual(1);
    expect(city.nome).toEqual(attrs.nome);
  });

  it("should create a city", async () => {
    const attrs = await factory.attrs<CidadeInstance>("Cidade");

    const city = await CidadeDal.create(attrs);

    expect(city.id).toBe(1);
    expect(city.nome).toBe(attrs.nome);
  });

  it("should update a state", async () => {
    const attrs = await factory.attrs<CidadeInstance>("Cidade", {
      nome: "santos",
    });

    const city = await CidadeDal.create(attrs);

    const updatedCity = await CidadeDal.update(city.id, {
      nome: "curitiba",
    });

    expect(city.id).toBe(1);
    expect(city.nome).not.toEqual(updatedCity.nome);
  });

  it("should delete a state", async () => {
    const city = await CidadeDal.create(await factory.attrs("Cidade"));

    await expect(CidadeDal.destroy(city.id)).resolves.not.toThrow(
      EmptyResultError
    );
  });

  it("should not delete a non-existing person", async () => {
    await CidadeDal.create(await factory.attrs("Cidade"));

    await expect(CidadeDal.destroy(2)).rejects.toThrow(EmptyResultError);
  });
});

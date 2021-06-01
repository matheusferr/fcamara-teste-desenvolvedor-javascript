import { PaisDal } from "@dals";
import { PaisInstance } from "src/database/models/Pais";
import factory from "../../factory";
import { truncate } from "../../utils";

describe("PaisDal", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should list all countries", async () => {
    await factory.create("Pais");

    const countries = await PaisDal.findAll();

    expect(countries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
        }),
      ])
    );
  });

  it("should find a country by its ID", async () => {
    const attrs = await factory.create<PaisInstance>("Pais");

    const country = await PaisDal.findById(1);

    expect(country.sigla).toEqual(attrs.sigla);
  });

  it("should find a country by its abbr", async () => {
    const attrs = await factory.create<PaisInstance>("Pais");

    const state = await PaisDal.findBySigla(attrs.sigla);

    expect(state.id).toEqual(1);
    expect(state.sigla).toEqual(attrs.sigla);
  });
});

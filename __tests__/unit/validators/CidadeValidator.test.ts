import { CidadeValidator } from "@validators";
import { InvalidBodyFormat } from "@errors";
import { truncate } from "../../utils";
import factory from "../../factory";

describe("Cidade Validator", () => {
  beforeEach(async () => {
    await truncate();

    await factory.create("Pais");
    await factory.create("Estado");
  });

  it("should validate the creation attrs", async () => {
    const payload = {
      nome: "",
      id_estado: 0,
    };

    expect(() => CidadeValidator.validateCreateAttr(payload)).toThrow(
      InvalidBodyFormat
    );
  });

  it("should validate the update attrs", async () => {
    const payload = {
      nome: "",
      id_estado: undefined,
    };

    expect(() => CidadeValidator.validateUpdateAttr(payload)).toThrow(
      InvalidBodyFormat
    );
  });
});

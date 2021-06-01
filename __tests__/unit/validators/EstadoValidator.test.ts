import { EstadoValidator } from "@validators";
import { InvalidBodyFormat } from "@errors";
import { truncate } from "../../utils";
import factory from "../../factory";

describe("Estado Validator", () => {
  beforeEach(async () => {
    await truncate();

    await factory.create("Pais");
  });

  it("should validate the creation attrs", async () => {
    const payload = {
      sigla: "",
      id_pais: 0,
    };

    expect(() => EstadoValidator.validateCreateAttr(payload)).toThrow(
      InvalidBodyFormat
    );
  });

  it("should validate the update attrs", async () => {
    const payload = {
      sigla: "",
      id_pais: undefined,
    };

    expect(() => EstadoValidator.validateUpdateAttr(payload)).toThrow(
      InvalidBodyFormat
    );
  });
});

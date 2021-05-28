import faker from "faker";
import { Pais } from "@models";
import { EstadoValidator } from "@validators";
import { InvalidBodyFormat } from "@errors";
import { truncate } from "../../utils";

describe("Estado Validator", () => {
  beforeEach(async () => {
    await truncate();

    await Pais.create({
      sigla: faker.address.countryCode(),
    });
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

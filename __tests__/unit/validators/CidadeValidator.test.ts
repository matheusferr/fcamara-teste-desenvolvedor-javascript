import faker from "faker";
import { Pais, Estado } from "@models";
import { CidadeValidator } from "@validators";
import { InvalidBodyFormat } from "@errors";
import { truncate } from "../../utils";

describe("Cidade Validator", () => {
  beforeEach(async () => {
    await truncate();

    await Pais.create({
      sigla: faker.address.countryCode(),
    });

    await Estado.create({
      sigla: faker.address.stateAbbr(),
      id_pais: 1,
    });
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

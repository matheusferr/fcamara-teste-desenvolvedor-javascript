import faker from "faker";
import { Pais, Estado, Cidade } from "@models";
import { PessoaValidator } from "@validators";
import { InvalidBodyFormat, InvalidCpf } from "@errors";
import { truncate } from "../../utils";

describe("Pessoa Validator", () => {
  beforeEach(async () => {
    await truncate();

    await Pais.create({
      sigla: faker.address.countryCode(),
    });

    await Estado.create({
      sigla: faker.address.stateAbbr(),
      id_pais: 1,
    });

    await Cidade.create({
      nome: faker.address.cityName(),
      id_estado: 1,
    });
  });

  it("should validate the creation attrs", async () => {
    const payload = {
      nome: "",
      cpf: "34414418267",
      email: "",
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
    };

    expect(() => PessoaValidator.validateCreateAttr(payload)).toThrow(
      InvalidBodyFormat
    );
  });

  it("should validate the cpf field", async () => {
    const payload = {
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
      cpf: "11111111111",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
    };

    expect(() => PessoaValidator.validateCreateAttr(payload)).toThrow(
      InvalidCpf
    );
  });

  it("should validate the update attrs", async () => {
    const payload = {
      nome: "",
      cpf: "",
      email: "",
      data_nascimento: undefined,
      local_nascimento: undefined,
    };

    expect(() => PessoaValidator.validateUpdateAttr(payload)).toThrow(
      InvalidBodyFormat
    );
  });
});

import faker from "faker";
import { PessoaValidator } from "@validators";
import { InvalidBodyFormat, InvalidCpf } from "@errors";
import { PessoaInstance } from "src/database/models/Pessoa";
import { truncate } from "../../utils";
import factory from "../../factory";

describe("Pessoa Validator", () => {
  beforeEach(async () => {
    await truncate();

    await factory.create("Pais");
    await factory.create("Estado");
    await factory.create("Cidade");
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
    const payload = await factory.attrs<PessoaInstance>("Pessoa", {
      cpf: "11111111121",
    });

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

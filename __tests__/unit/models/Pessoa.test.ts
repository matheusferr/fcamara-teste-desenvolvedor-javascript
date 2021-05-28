import {
  UniqueConstraintError,
  ForeignKeyConstraintError,
  ValidationError,
} from "sequelize";
import faker from "faker";
import { Pais, Estado, Cidade, Pessoa } from "@models";
import { truncate } from "../../utils";

describe("Table Pessoa", () => {
  beforeEach(async () => {
    await truncate();

    const country = await Pais.create({
      sigla: faker.address.countryCode(),
    });

    const state = await Estado.create({
      sigla: faker.address.stateAbbr(),
      id_pais: country.id,
    });

    await Cidade.create({
      nome: faker.address.cityName(),
      id_estado: state.id,
    });
  });

  it("should create a person", async () => {
    const person = await Pessoa.create({
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}} "
      ),
      cpf: "11111111111",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
    });

    expect(person.id).toBe(1);
  });

  it("should create a person with optional fields", async () => {
    const person = await Pessoa.create({
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}} "
      ),
      cpf: "11111111111",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
      nome_mae: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}} "
      ),
      nome_pai: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}} "
      ),
    });

    expect(person.id).toBe(1);
  });

  it("should respect unique constraint in field cpf", async () => {
    await Pessoa.create({
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}} "
      ),
      cpf: "11111111111",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
    });

    await expect(
      Pessoa.create({
        nome: faker.fake(
          "{{name.firstName}} {{name.middleName}} {{name.lastName}} "
        ),
        cpf: "11111111111",
        email: faker.internet.email(),
        data_nascimento: faker.date.past(),
        local_nascimento: 1,
      })
    ).rejects.toThrow(UniqueConstraintError);
  });

  it("should validate required fields", async () => {
    await expect(
      Pessoa.create({
        nome: "",
        cpf: "",
        email: "",
        data_nascimento: faker.date.past(),
        local_nascimento: 1,
      })
    ).rejects.toThrow(ValidationError);
  });

  it("should respect foreign key constraint", async () => {
    await expect(
      Pessoa.create({
        nome: faker.fake(
          "{{name.firstName}} {{name.middleName}} {{name.lastName}} "
        ),
        cpf: "11111111111",
        email: faker.internet.email(),
        data_nascimento: faker.date.past(),
        local_nascimento: 2,
      })
    ).rejects.toThrow(ForeignKeyConstraintError);
  });
});

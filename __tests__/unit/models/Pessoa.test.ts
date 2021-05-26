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
  });

  it("should create a person", async () => {
    const country = await Pais.create({
      sigla: faker.address.countryCode(),
    });

    const state = await Estado.create({
      sigla: faker.address.stateAbbr(),
      id_pais: country.id,
    });

    const city = await Cidade.create({
      nome: faker.address.cityName(),
      id_estado: state.id,
    });

    const person = await Pessoa.create({
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}} "
      ),
      cpf: "11111111111",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: city.id,
    });

    expect(person.id).toBe(1);
  });

  it("should create a person with optional fields", async () => {
    const country = await Pais.create({
      sigla: faker.address.countryCode(),
    });

    const state = await Estado.create({
      sigla: faker.address.stateAbbr(),
      id_pais: country.id,
    });

    const city = await Cidade.create({
      nome: faker.address.cityName(),
      id_estado: state.id,
    });

    const person = await Pessoa.create({
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}} "
      ),
      cpf: "11111111111",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: city.id,
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
    const country = await Pais.create({
      sigla: faker.address.countryCode(),
    });

    const state = await Estado.create({
      sigla: faker.address.stateAbbr(),
      id_pais: country.id,
    });

    const city = await Cidade.create({
      nome: faker.address.cityName(),
      id_estado: state.id,
    });

    await Pessoa.create({
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}} "
      ),
      cpf: "11111111111",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: city.id,
    });

    await expect(
      Pessoa.create({
        nome: faker.fake(
          "{{name.firstName}} {{name.middleName}} {{name.lastName}} "
        ),
        cpf: "11111111111",
        email: faker.internet.email(),
        data_nascimento: faker.date.past(),
        local_nascimento: city.id,
      })
    ).rejects.toThrow(UniqueConstraintError);
  });

  it("should validate required fields", async () => {
    const country = await Pais.create({
      sigla: faker.address.countryCode(),
    });

    const state = await Estado.create({
      sigla: faker.address.stateAbbr(),
      id_pais: country.id,
    });

    const city = await Cidade.create({
      nome: faker.address.cityName(),
      id_estado: state.id,
    });

    await expect(
      Pessoa.create({
        nome: "",
        cpf: "",
        email: "",
        data_nascimento: faker.date.past(),
        local_nascimento: city.id,
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

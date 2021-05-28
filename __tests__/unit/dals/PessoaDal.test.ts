import { EmptyResultError } from "sequelize";
import faker from "faker";
import { Pais, Estado, Cidade } from "@models";
import { PessoaDal } from "@dals";
import { truncate } from "../../utils";

describe("PessoaDal", () => {
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
    const person = await PessoaDal.create({
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
      cpf: "11111111111",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
    });

    expect(person.id).toBe(1);
  });

  it("should find a person by its ID", async () => {
    await PessoaDal.create({
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
      cpf: "11111111111",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
    });

    const search = await PessoaDal.findById(1);

    expect(search.cpf).toBe("11111111111");
  });

  it("should find a person by its CPF", async () => {
    await PessoaDal.create({
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
      cpf: "11111111111",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
    });

    await PessoaDal.create({
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
      cpf: "22222222222",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
    });

    await PessoaDal.create({
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
      cpf: "33333333333",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
    });

    const search = await PessoaDal.findByCpf("22222222222");

    expect(search.id).toBe(2);
  });

  it("should get association values", async () => {
    await PessoaDal.create({
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
      cpf: "11111111111",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
    });

    const { nome: cidade } = await Cidade.findByPk(1, {
      rejectOnEmpty: true,
      attributes: ["nome"],
    });

    const { sigla: estado } = await Estado.findByPk(1, {
      rejectOnEmpty: true,
      attributes: ["sigla"],
    });

    const { sigla: pais } = await Pais.findByPk(1, {
      rejectOnEmpty: true,
      attributes: ["sigla"],
    });

    // eslint-disable-next-line camelcase
    const local_nascimento = `${cidade} - ${estado}, ${pais}`;

    const search = await PessoaDal.findById(1);

    expect(search.local_nascimento).toBe(local_nascimento);
  });

  it("should update a person", async () => {
    const person = await PessoaDal.create({
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
      cpf: "11111111111",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
    });

    const updatedPerson = await PessoaDal.update(person.id, {
      email: faker.internet.email(),
    });

    expect(person.email).not.toEqual(updatedPerson.email);
  });

  it("should delete an existing person", async () => {
    const person = await PessoaDal.create({
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
      cpf: "11111111111",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
    });

    await expect(PessoaDal.destroy(person.id)).resolves.not.toThrow(
      EmptyResultError
    );
  });

  it("should not delete a non-existing person", async () => {
    await PessoaDal.create({
      nome: faker.fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
      cpf: "11111111111",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
    });

    await expect(PessoaDal.destroy(2)).rejects.toThrow(EmptyResultError);
  });
});

import request from "supertest";
import faker, { fake } from "faker";
import { Pais, Estado, Cidade } from "@models";
import { PessoaDal } from "@dals";
import { truncate } from "../utils";
import app from "../../src/app";

describe("Pessoa routes", () => {
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

  it("should find a person by its ID", async () => {
    const payload = {
      nome: fake("{{name.firstName}} {{name.middleName}} {{name.lastName}}"),
      cpf: "34414418267",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
      nome_mae: fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
      nome_pai: fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
    };

    const person = await PessoaDal.create(payload);

    const response = await request(app.express)
      .get(`/api/pessoa/${person.id}`)
      .send(payload);

    expect(response.status).toBe(200);
  });

  it("should find a person by its CPF", async () => {
    const payload = {
      nome: fake("{{name.firstName}} {{name.middleName}} {{name.lastName}}"),
      cpf: "34414418267",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
      nome_mae: fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
      nome_pai: fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
    };

    const person = await PessoaDal.create(payload);

    const response = await request(app.express)
      .get(`/api/pessoa?cpf=${person.cpf}`)
      .send(payload);

    expect(response.status).toBe(200);
  });

  it("should create a person", async () => {
    const payload = {
      nome: fake("{{name.firstName}} {{name.middleName}} {{name.lastName}}"),
      cpf: "34414418267",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
      nome_mae: fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
      nome_pai: fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
    };

    const response = await request(app.express)
      .post("/api/pessoas")
      .send(payload);

    expect(response.status).toBe(201);
  });

  it("should update a person", async () => {
    const payload = {
      nome: fake("{{name.firstName}} {{name.middleName}} {{name.lastName}}"),
      cpf: "34414418267",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
      nome_mae: fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
      nome_pai: fake(
        "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
      ),
    };

    const person = await PessoaDal.create(payload);

    payload.nome = fake(
      "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
    );

    const response = await request(app.express)
      .put(`/api/pessoa/${person.id}`)
      .send(payload);

    expect(response.status).toBe(200);
  });

  it("should respect foreign key constraint", async () => {
    const payload = {
      nome: fake("{{name.firstName}} {{name.middleName}} {{name.lastName}}"),
      cpf: "34414418267",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
    };

    await PessoaDal.create(payload);

    payload.nome = fake(
      "{{name.firstName}} {{name.middleName}} {{name.lastName}}"
    );
    payload.email = faker.internet.email();
    payload.data_nascimento = faker.date.past();

    const response = await request(app.express)
      .post("/api/pessoas")
      .send(payload);

    expect(response.status).toBe(400);
  });

  it("should delete a person", async () => {
    const payload = {
      nome: fake("{{name.firstName}} {{name.middleName}} {{name.lastName}}"),
      cpf: "34414418267",
      email: faker.internet.email(),
      data_nascimento: faker.date.past(),
      local_nascimento: 1,
    };

    const person = await PessoaDal.create(payload);

    const response = await request(app.express)
      .delete(`/api/pessoa/${person.id}`)
      .send();

    expect(response.status).toBe(200);
  });
});

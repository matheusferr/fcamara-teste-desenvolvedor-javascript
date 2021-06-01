import request from "supertest";
import { PessoaDal } from "@dals";
import { PessoaInstance } from "src/database/models/Pessoa";
import { truncate } from "../utils";
import factory from "../factory";
import app from "../../src/app";

describe("Pessoa routes", () => {
  beforeEach(async () => {
    await truncate();

    await factory.create("Pais");
    await factory.create("Estado");
    await factory.create("Cidade");
  });

  it("should find a person by its ID", async () => {
    const payload = await factory.attrs<PessoaInstance>("Pessoa");

    const person = await PessoaDal.create(payload);

    const response = await request(app)
      .get(`/api/pessoa/${person.id}`)
      .send(payload);

    expect(response.status).toBe(200);
  });

  it("should find a person by its CPF", async () => {
    const payload = await factory.attrs<PessoaInstance>("Pessoa", {
      cpf: "34414418267",
    });

    const person = await PessoaDal.create(payload);

    const response = await request(app)
      .get(`/api/pessoa?cpf=${person.cpf}`)
      .send(payload);

    expect(response.status).toBe(200);
  });

  it("should create a person", async () => {
    const payload = await factory.attrs<PessoaInstance>("Pessoa", {
      cpf: "34414418267",
      nome_mae: "Lorem Ipsum",
      nome_pai: "Dolor Sit",
    });

    const response = await request(app).post("/api/pessoas").send(payload);

    expect(response.status).toBe(201);
  });

  it("should update a person", async () => {
    const payload = await factory.attrs<PessoaInstance>("Pessoa", {
      cpf: "34414418267",
    });

    const person = await PessoaDal.create(payload);

    payload.nome = "Lorem Ipsum";

    const response = await request(app)
      .put(`/api/pessoa/${person.id}`)
      .send(payload);

    expect(response.status).toBe(200);
  });

  it("should respect unique key constraint", async () => {
    const payload = await factory.attrs<PessoaInstance>("Pessoa", {
      cpf: "34414418267",
    });

    await PessoaDal.create(payload);

    payload.nome = "Lorem Ipsum";

    const response = await request(app).post("/api/pessoas").send(payload);

    expect(response.status).toBe(400);
  });

  it("should respect foreign key constraint", async () => {
    const payload = await factory.attrs<PessoaInstance>("Pessoa", {
      cpf: "34414418267",
      local_nascimento: 2,
    });

    const response = await request(app).post("/api/pessoas").send(payload);

    expect(response.status).toBe(400);
  });

  it("should delete a person", async () => {
    const payload = await factory.attrs<PessoaInstance>("Pessoa", {
      cpf: "34414418267",
    });

    const person = await PessoaDal.create(payload);

    const response = await request(app)
      .delete(`/api/pessoa/${person.id}`)
      .send();

    expect(response.status).toBe(204);
  });
});

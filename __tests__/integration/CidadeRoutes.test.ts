import request from "supertest";
import { CidadeDal } from "@dals";
import { CidadeInstance } from "src/database/models/Cidade";
import { truncate } from "../utils";
import factory from "../factory";
import app from "../../src/app";

describe("Cidade routes", () => {
  beforeEach(async () => {
    await truncate();

    await factory.create("Pais");
    await factory.create("Estado");
  });

  it("should list all cities", async () => {
    const response = await request(app).get("/api/cidades");

    expect(response.status).toBe(200);
  });

  it("should find a city by its ID", async () => {
    const city = await factory.create<CidadeInstance>("Cidade");
    const response = await request(app).get(`/api/cidade/${city.id}`);

    expect(response.status).toBe(200);
  });

  it("should find a city by name", async () => {
    const city = await factory.create<CidadeInstance>("Cidade");
    const response = await request(app).get(`/api/cidade?nome=${city.nome}`);

    expect(response.status).toBe(200);
  });

  it("should create a city", async () => {
    const payload = await factory.attrs<CidadeInstance>("Cidade");

    const response = await request(app).post("/api/cidades").send(payload);

    expect(response.status).toBe(201);
  });

  it("should update a city", async () => {
    const payload = await factory.attrs<CidadeInstance>("Cidade");

    const city = await CidadeDal.create(payload);

    payload.nome = "são paulo";

    const response = await request(app)
      .put(`/api/cidade/${city.id}`)
      .send(payload);

    expect(response.status).toBe(200);
  });

  it("should respect foreign key constraint", async () => {
    const payload = await factory.attrs<CidadeInstance>("Cidade", {
      id_estado: 2,
    });

    const response = await request(app).post("/api/cidades").send(payload);

    expect(response.status).toBe(400);
  });

  it("should delete a city", async () => {
    const payload = await factory.attrs<CidadeInstance>("Cidade");

    const city = await CidadeDal.create(payload);

    const response = await request(app).delete(`/api/cidade/${city.id}`).send();

    expect(response.status).toBe(204);
  });
});

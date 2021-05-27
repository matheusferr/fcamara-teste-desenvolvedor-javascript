import request from "supertest";
import faker from "faker";
import { Pais, Estado } from "@models";
import { CidadeDal } from "@dals";
import { truncate } from "../utils";
import app from "../../src/app";

describe("Cidade routes", () => {
  beforeEach(async () => {
    await truncate();

    const country = await Pais.create({
      sigla: faker.address.countryCode(),
    });

    await Estado.create({
      sigla: faker.address.stateAbbr(),
      id_pais: country.id,
    });
  });

  it("should create a city", async () => {
    const payload = {
      nome: faker.address.cityName(),
      id_estado: 1,
    };

    const response = await request(app.express)
      .post("/api/cidades")
      .send(payload);

    expect(response.status).toBe(201);
  });

  it("should update a city", async () => {
    const payload = {
      nome: faker.address.cityName(),
      id_estado: 1,
    };

    const city = await CidadeDal.create(payload);

    payload.nome = faker.address.cityName();

    const response = await request(app.express)
      .put(`/api/cidade/${city.id}`)
      .send(payload);

    expect(response.status).toBe(200);
  });

  it("should respect foreign key constraint", async () => {
    const payload = {
      nome: faker.address.cityName(),
      id_estado: 2,
    };

    const response = await request(app.express)
      .post("/api/cidades")
      .send(payload);

    expect(response.status).toBe(400);
  });

  it("should delete a city", async () => {
    const payload = {
      nome: faker.address.cityName(),
      id_estado: 1,
    };

    const city = await CidadeDal.create(payload);

    const response = await request(app.express)
      .delete(`/api/cidade/${city.id}`)
      .send();

    expect(response.status).toBe(200);
  });
});

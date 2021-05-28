import request from "supertest";
import faker from "faker";
import { Pais } from "@models";
import { EstadoDal } from "@dals";
import { truncate } from "../utils";
import app from "../../src/app";

describe("Estado routes", () => {
  beforeEach(async () => {
    await truncate();

    await Pais.create({
      sigla: faker.address.countryCode(),
    });
  });

  it("should create a state", async () => {
    const payload = {
      sigla: faker.address.stateAbbr(),
      id_pais: 1,
    };

    const response = await request(app.express)
      .post("/api/estados")
      .send(payload);

    expect(response.status).toBe(201);
  });

  it("should update a state", async () => {
    const payload = {
      sigla: faker.address.stateAbbr(),
      id_pais: 1,
    };

    const state = await EstadoDal.create(payload);

    payload.sigla = faker.address.stateAbbr();

    const response = await request(app.express)
      .put(`/api/estado/${state.id}`)
      .send(payload);

    expect(response.status).toBe(200);
  });

  it("should respect foreign key constraint", async () => {
    const payload = {
      sigla: faker.address.stateAbbr(),
      id_pais: 2,
    };

    const response = await request(app.express)
      .post("/api/estados")
      .send(payload);

    expect(response.status).toBe(400);
  });

  it("should delete a state", async () => {
    const payload = {
      sigla: faker.address.stateAbbr(),
      id_pais: 1,
    };

    const state = await EstadoDal.create(payload);

    const response = await request(app.express)
      .delete(`/api/estado/${state.id}`)
      .send();

    expect(response.status).toBe(200);
  });
});

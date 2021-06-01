import request from "supertest";
import { EstadoDal } from "@dals";
import { EstadoInstance } from "src/database/models/Estado";
import { truncate } from "../utils";
import app from "../../src/app";
import factory from "../factory";

describe("Estado routes", () => {
  beforeEach(async () => {
    await truncate();

    await factory.create("Pais");
  });

  it("should list all states", async () => {
    const response = await request(app.express).get("/api/estados");

    expect(response.status).toBe(200);
  });

  it("should find a state its ID", async () => {
    const state = await factory.create<EstadoInstance>("Estado");
    const response = await request(app.express).get(`/api/estado/${state.id}`);

    expect(response.status).toBe(200);
  });

  it("should find a state by abbr", async () => {
    const state = await factory.create<EstadoInstance>("Estado");
    const response = await request(app.express).get(
      `/api/estado?sigla=${state.sigla}`
    );

    expect(response.status).toBe(200);
  });

  it("should create a state", async () => {
    const payload = await factory.attrs<EstadoInstance>("Estado");

    const response = await request(app.express)
      .post("/api/estados")
      .send(payload);

    expect(response.status).toBe(201);
  });

  it("should update a state", async () => {
    const payload = await factory.attrs<EstadoInstance>("Estado");

    const state = await EstadoDal.create(payload);

    payload.sigla = "RR";

    const response = await request(app.express)
      .put(`/api/estado/${state.id}`)
      .send(payload);

    expect(response.status).toBe(200);
  });

  it("should respect foreign key constraint", async () => {
    const payload = await factory.attrs<EstadoInstance>("Estado", {
      id_pais: 2,
    });

    const response = await request(app.express)
      .post("/api/estados")
      .send(payload);

    expect(response.status).toBe(400);
  });

  it("should delete a state", async () => {
    const payload = await factory.attrs<EstadoInstance>("Estado");

    const state = await EstadoDal.create(payload);

    const response = await request(app.express)
      .delete(`/api/estado/${state.id}`)
      .send();

    expect(response.status).toBe(200);
  });
});

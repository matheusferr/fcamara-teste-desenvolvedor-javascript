import request from "supertest";
import { PaisInstance } from "src/database/models/Pais";
import { truncate } from "../utils";
import factory from "../factory";
import app from "../../src/app";

describe("Pais routes", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should list all countries", async () => {
    const response = await request(app).get("/api/paises");

    expect(response.status).toBe(200);
  });

  it("should find a country by its ID", async () => {
    const country = await factory.create<PaisInstance>("Pais");

    const response = await request(app).get(`/api/pais/${country.id}`);

    expect(response.status).toBe(200);
  });

  it("should find a country by its abbr", async () => {
    const country = await factory.create<PaisInstance>("Pais");

    const response = await request(app).get(`/api/pais?sigla=${country.sigla}`);

    expect(response.status).toBe(200);
  });
});

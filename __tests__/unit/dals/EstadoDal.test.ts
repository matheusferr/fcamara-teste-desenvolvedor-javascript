import { EmptyResultError } from "sequelize";
import faker from "faker";
import { Pais } from "@models";
import { EstadoDal } from "@dals";
import { truncate } from "../../utils";

describe("EstadoDal", () => {
  beforeEach(async () => {
    await truncate();

    await Pais.create({
      sigla: faker.address.countryCode(),
    });
  });

  it("should create a state", async () => {
    const estado = await EstadoDal.create({
      sigla: faker.address.stateAbbr(),
      id_pais: 1,
    });

    expect(estado.id).toBe(1);
  });

  it("should update a state", async () => {
    const estado = await EstadoDal.create({
      sigla: faker.address.stateAbbr(),
      id_pais: 1,
    });

    const estadoAtualizado = await EstadoDal.update(estado.id, {
      sigla: faker.address.stateAbbr(),
    });

    expect(estado.sigla).not.toEqual(estadoAtualizado.sigla);
  });

  it("should delete a state", async () => {
    const estado = await EstadoDal.create({
      sigla: faker.address.stateAbbr(),
      id_pais: 1,
    });

    await expect(EstadoDal.destroy(estado.id)).resolves.not.toThrow(
      EmptyResultError
    );
  });

  it("should not delete a non-existing person", async () => {
    await EstadoDal.create({
      sigla: faker.address.stateAbbr(),
      id_pais: 1,
    });

    await expect(EstadoDal.destroy(2)).rejects.toThrow(EmptyResultError);
  });
});

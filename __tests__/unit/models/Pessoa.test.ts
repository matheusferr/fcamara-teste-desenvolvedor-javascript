import {
  UniqueConstraintError,
  ForeignKeyConstraintError,
  ValidationError,
} from "sequelize";
import { PessoaInstance } from "src/database/models/Pessoa";
import factory from "../../factory";
import { truncate } from "../../utils";

describe("Table Pessoa", () => {
  beforeEach(async () => {
    await truncate();

    await factory.create("Pais");
    await factory.create("Estado");
    await factory.create("Cidade");
  });

  it("should create a person", async () => {
    const person = await factory.create<PessoaInstance>("Pessoa");

    expect(person.id).toBe(1);
  });

  it("should create a person with optional fields", async () => {
    const person = await factory.create<PessoaInstance>("Pessoa", {
      nome_mae: "Lorem Ipsum",
      nome_pai: "Dolor Sit",
    });

    expect(person.id).toBe(1);
  });

  it("should respect unique constraint in field cpf", async () => {
    await factory.create<PessoaInstance>("Pessoa");

    await expect(factory.create<PessoaInstance>("Pessoa")).rejects.toThrow(
      UniqueConstraintError
    );
  });

  it("should validate required fields", async () => {
    await expect(
      factory.create<PessoaInstance>("Pessoa", {
        nome: "",
        cpf: "",
        email: "",
      })
    ).rejects.toThrow(ValidationError);
  });

  it("should validate email field", async () => {
    await expect(
      factory.create<PessoaInstance>("Pessoa", {
        email: "abcdef",
      })
    ).rejects.toThrow(ValidationError);
  });

  it("should respect foreign key constraint", async () => {
    await expect(
      factory.create<PessoaInstance>("Pessoa", {
        local_nascimento: 2,
      })
    ).rejects.toThrow(ForeignKeyConstraintError);
  });
});

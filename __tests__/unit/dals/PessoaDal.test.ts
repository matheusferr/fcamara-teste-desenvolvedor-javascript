import { EmptyResultError } from "sequelize";
import { PessoaDal } from "@dals";
import { PaisInstance } from "src/database/models/Pais";
import { EstadoInstance } from "src/database/models/Estado";
import { CidadeInstance } from "src/database/models/Cidade";
import { PessoaInstance } from "src/database/models/Pessoa";
import { truncate } from "../../utils";
import factory from "../../factory";

describe("PessoaDal", () => {
  beforeEach(async () => {
    await truncate();

    await factory.create("Pais");
    await factory.create("Estado");
    await factory.create("Cidade");
  });

  it("should create a person", async () => {
    const attrs = await factory.attrs<PessoaInstance>("Pessoa");
    const person = await PessoaDal.create(attrs);

    expect(person.id).toBe(1);
    expect(person.nome).toBe(attrs.nome);
    expect(person.cpf).toBe(attrs.cpf);
    expect(person.email).toBe(attrs.email);
    expect(person.data_nascimento).toBe(attrs.data_nascimento);
    expect(person.local_nascimento).toBe(attrs.local_nascimento);
  });

  it("should find a person by its ID", async () => {
    const attrs = await factory.attrs<PessoaInstance>("Pessoa");

    await PessoaDal.create(attrs);

    const search = await PessoaDal.findById(1);

    expect(search.cpf).toBe("11111111111");
  });

  it("should find a person by its CPF", async () => {
    await PessoaDal.create(await factory.attrs("Pessoa"));

    await PessoaDal.create(
      await factory.attrs<PessoaInstance>("Pessoa", {
        cpf: "22222222222",
      })
    );

    await PessoaDal.create(
      await factory.attrs<PessoaInstance>("Pessoa", {
        cpf: "33333333333",
      })
    );

    const search = await PessoaDal.findByCpf("22222222222");

    expect(search.id).toBe(2);
  });

  it("should get association values", async () => {
    const { sigla: pais } = await factory.create<PaisInstance>("Pais", {
      sigla: "br",
    });
    const { sigla: estado } = await factory.create<EstadoInstance>("Estado", {
      id_pais: 2,
    });
    const { nome: cidade } = await factory.create<CidadeInstance>("Cidade", {
      nome: "santos",
      id_estado: 2,
    });

    await PessoaDal.create(
      await factory.attrs<PessoaInstance>("Pessoa", { local_nascimento: 2 })
    );

    // eslint-disable-next-line camelcase
    const local_nascimento = `${cidade} - ${estado}, ${pais}`;

    const search = await PessoaDal.findById(1);

    expect(search.local_nascimento).toBe(local_nascimento);
  });

  it("should update a person", async () => {
    const person = await PessoaDal.create(await factory.attrs("Pessoa"));

    const updatedPerson = await PessoaDal.update(person.id, {
      nome: "Lorem Ipsum",
      nome_mae: "Dolor Sit",
    });

    expect(person.nome).not.toEqual(updatedPerson.nome);
    expect(person.nome_mae).not.toEqual(updatedPerson.nome_mae);
  });

  it("should delete an existing person", async () => {
    const person = await PessoaDal.create(await factory.attrs("Pessoa"));

    await expect(PessoaDal.destroy(person.id)).resolves.not.toThrow(
      EmptyResultError
    );
  });

  it("should not delete a non-existing person", async () => {
    await PessoaDal.create(await factory.attrs("Pessoa"));

    await expect(PessoaDal.destroy(2)).rejects.toThrow(EmptyResultError);
  });
});

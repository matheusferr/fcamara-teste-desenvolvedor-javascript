import { factory } from "factory-girl";
import faker from "faker";
import { Pais, Estado, Cidade, Pessoa } from "@models";

factory.define("Pais", Pais, {
  sigla: faker.address.countryCode().toUpperCase(),
});

factory.define("Estado", Estado, {
  sigla: faker.address.stateAbbr().toUpperCase(),
  id_pais: 1,
});

factory.define("Cidade", Cidade, {
  nome: faker.address.cityName().toUpperCase(),
  id_estado: 1,
});

factory.define("Pessoa", Pessoa, {
  nome: faker.name.findName().toUpperCase(),
  cpf: "11111111111",
  email: faker.internet.email().toUpperCase(),
  data_nascimento: faker.date.past(),
  local_nascimento: 1,
  nome_mae: null,
  nome_pai: null,
});

export default factory;

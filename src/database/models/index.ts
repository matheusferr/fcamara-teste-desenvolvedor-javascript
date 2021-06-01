import Pais from "./Pais";
import Estado from "./Estado";
import Cidade from "./Cidade";
import Pessoa from "./Pessoa";

Pais.hasMany(Estado, {
  foreignKey: "id_pais",
  as: "paisEstado",
});

Estado.belongsTo(Pais, {
  foreignKey: "id_pais",
  as: "paisEstado",
});

Estado.hasMany(Cidade, {
  foreignKey: "id_estado",
  as: "estadoCidade",
});

Cidade.belongsTo(Estado, {
  foreignKey: "id_estado",
  as: "estadoCidade",
});

Cidade.hasMany(Pessoa, {
  foreignKey: "local_nascimento",
  as: "cidadePessoa",
});

Pessoa.belongsTo(Cidade, {
  foreignKey: "local_nascimento",
  as: "cidadePessoa",
});

export { Pais, Estado, Cidade, Pessoa };

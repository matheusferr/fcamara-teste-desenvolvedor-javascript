/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "./connection";

interface PessoaAttr {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  data_nascimento: Date;
  local_nascimento: number;
  nome_mae?: string;
  nome_pai?: string;
}

export interface PessoaUpdateAttr {
  nome?: string;
  cpf?: string;
  email?: string;
  data_nascimento?: Date;
  local_nascimento?: number;
  nome_mae?: string;
  nome_pai?: string;
}

export interface PessoaCreationAttr extends Optional<PessoaAttr, "id"> {}

interface PessoaInstance
  extends Model<PessoaAttr, PessoaCreationAttr>,
    PessoaAttr {
  created_at?: Date;
  updated_at?: Date;
}
const Pessoa = sequelize.define<PessoaInstance>(
  "Pessoa",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    data_nascimento: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nome_mae: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    nome_pai: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    local_nascimento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: "pessoa",
  }
);

export default Pessoa;

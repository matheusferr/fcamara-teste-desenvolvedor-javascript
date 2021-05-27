/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "./connection";

interface CidadeAttr {
  id: number;
  nome: string;
  id_estado: number;
}

export interface CidadeUpdateAttr {
  nome?: string;
  id_estado?: number;
}

export interface CidadeCreationAttr extends Optional<CidadeAttr, "id"> {}

interface CidadeInstance
  extends Model<CidadeAttr, CidadeCreationAttr>,
    CidadeAttr {
  created_at?: Date;
  updated_at?: Date;
}

const Cidade = sequelize.define<CidadeInstance>(
  "Cidade",
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
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    id_estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "cidade",
    hooks: {
      beforeSave: (instance: CidadeInstance) => {
        instance.nome = instance.nome.toUpperCase();
      },
    },
  }
);

export default Cidade;

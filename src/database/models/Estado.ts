/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "./connection";

interface EstadoAttr {
  id: number;
  sigla: string;
  id_pais: number;
}

export interface EstadoUpdateAttr {
  sigla?: string;
  id_pais?: number;
}

export interface EstadoCreationAttr extends Optional<EstadoAttr, "id"> {}

interface EstadoInstance
  extends Model<EstadoAttr, EstadoCreationAttr>,
    EstadoAttr {
  createdAt?: Date;
  updatedAt?: Date;
}

const Estado = sequelize.define<EstadoInstance>(
  "Estado",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    sigla: {
      type: DataTypes.STRING(2),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    id_pais: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "estado",
    hooks: {
      beforeSave: (instance: EstadoInstance) => {
        instance.sigla = instance.sigla.toUpperCase();
      },
    },
  }
);

export default Estado;

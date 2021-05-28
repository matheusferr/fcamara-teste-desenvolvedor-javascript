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
  created_at?: Date;
  updated_at?: Date;
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
      validate: {
        notEmpty: true,
        len: [2, 2],
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

/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "./connection";

interface PaisAttr {
  id: number;
  sigla: string;
}

export interface PaisCreationAttr extends Optional<PaisAttr, "id"> {}

interface PaisInstance extends Model<PaisAttr, PaisCreationAttr>, PaisAttr {
  created_at?: Date;
  updated_at?: Date;
}

const Pais = sequelize.define<PaisInstance>(
  "Pais",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sigla: {
      type: DataTypes.STRING(2),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: "pais",
    hooks: {
      beforeSave: (instance: PaisInstance) => {
        instance.sigla = instance.sigla.toUpperCase();
      },
    },
  }
);

export default Pais;

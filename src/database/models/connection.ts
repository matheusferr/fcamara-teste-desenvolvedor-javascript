import { Dialect, Sequelize } from "sequelize";

import config from "../../config/database";

const sequelize = new Sequelize(
  // @ts-ignore
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect as Dialect,
    define: {
      ...config.define,
    },
    logging: config.logging,
  }
);

export default sequelize;

import { Sequelize } from "sequelize";

import config from "../../config/database";

const sequelize = new Sequelize(
  // @ts-ignore
  config.database,
  config.username,
  config.password,
  config
);

export default sequelize;

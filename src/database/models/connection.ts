import { Sequelize } from "sequelize";

import config from "../../config/database";

const sequelize =
  process.env.NODE_ENV === "test"
    ? new Sequelize("sqlite::memory", {
        dialect: "sqlite",
        define: config.options.define,
        logging: config.options.logging,
      })
    : new Sequelize(
        config.database as string,
        config.username as string,
        config.password as string,
        config.options
      );

export default sequelize;

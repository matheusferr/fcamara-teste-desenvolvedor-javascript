import { Dialect, Sequelize } from "sequelize";

import config from "../../config/database";

const sequelize =
  process.env.NODE_ENV === "test"
    ? new Sequelize("sqlite::memory:", {
        logging: config.options.logging,
        define: config.options.define,
      })
    : new Sequelize(
        config.database as string,
        config.username as string,
        config.password as string,
        {
          ...config.options,
          dialect: config.dialect as Dialect,
        }
      );

export default sequelize;

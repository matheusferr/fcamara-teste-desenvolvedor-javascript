/* eslint-disable no-console */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const chalk = require("chalk");

const databaseLogger = (message) =>
  console.log(chalk.inverse.underline.blue(message));

const defaultConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  define: {
    freezeTableName: true,
    underscored: true,
  },
};

module.exports = {
  development: {
    ...defaultConfig,
    logging: databaseLogger,
  },
  test: {
    ...defaultConfig,
    logging: false,
  },
  production: {
    ...defaultConfig,
    logging: false,
  },
};

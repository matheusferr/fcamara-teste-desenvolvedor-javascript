/* eslint-disable no-console */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const chalk = require("chalk");

const databaseLogger = (message) =>
  console.log(chalk.inverse.underline.blue(message));

const options = {
  logging: process.env.NODE_ENV === "dev" ? databaseLogger : false,
  define: {
    freezeTableName: true,
    underscored: true,
  },
};

const defaultConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  options,
};

module.exports = defaultConfig;

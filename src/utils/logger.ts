/* eslint-disable no-console */
import chalk from "chalk";

export const info = (message: string) => console.log(chalk.bold.blue(message));

export const database = (message: string) =>
  console.log(chalk.inverse.underline.blue(message));

export const error = (message: string) =>
  console.log(chalk.bold.red(`Erro\n${message}`));

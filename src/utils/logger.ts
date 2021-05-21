/* eslint-disable no-console */
import chalk from "chalk";

export const info = (message: string) => console.log(chalk.bold.blue(message));

export const database = (message: string) =>
  console.log(chalk.inverse.underline.blue(message));

export const error = ({ message }: { message: string }) =>
  console.log(chalk.bold.blue(`Erro\n${message}`));

export const sumOne = (n: number) => n + 1;

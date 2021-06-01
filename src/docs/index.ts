import paths from "./paths";
import schemas from "./schemas";

export default {
  openapi: "3.0.0",
  info: {
    description:
      "Projeto criado para documentar o teste para a vaga de desenvolvedor backend com Typescript",
    version: "1.1.0",
    title: "API Pessoas",
    contact: {
      email: "math.ferr@outlook.com",
    },
    license: {
      name: "MIT",
      url: "https://github.com/matheusferr/fcamara-teste-desenvolvedor-javascript/blob/master/LICENSE",
    },
  },
  servers: [
    {
      url: "/api",
    },
  ],

  paths,
  schemas,
};

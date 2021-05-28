import paths from "./paths";
import schemas from "./schemas";

export default {
  openapi: "3.0.0",
  info: {
    description:
      "Projeto criado para documentar o teste para a vaga de desenvolvedor backend com Typescript",
    version: "1.0.0",
    title: "API Pessoas",
    contact: {
      email: "math.ferr@outlook.com",
    },
    license: {
      name: "MIT",
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

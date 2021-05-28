export const error404 = {
  type: "object",
  properties: {
    status: {
      type: "string",
      example: "erro",
    },
    mensagem: {
      type: "string",
      example: "Recurso nao encontrado",
    },
  },
};

export const error400 = {
  type: "object",
  properties: {
    status: {
      type: "string",
      example: "erro",
    },
    mensagem: {
      type: "string",
      example: "Formato do corpo inválido",
    },
  },
};

export const error404 = {
  type: "object",
  properties: {
    status: {
      type: "string",
      example: "error",
    },
    message: {
      type: "string",
      example: "Recurso nao encontrado",
    },
  },
};
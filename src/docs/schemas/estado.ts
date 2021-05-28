export const estado = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1,
    },
    sigla: {
      type: "string",
      example: "SP",
    },
    pais: {
      type: "string",
      example: "BR",
    },
  },
};

export const estadoCreation = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1,
    },
    sigla: {
      type: "string",
      example: "SP",
    },
    id_pais: {
      type: "integer",
      example: 1,
    },
  },
};

export const estadoBody = {
  type: "object",
  properties: {
    sigla: {
      type: "string",
      example: "SP",
    },
    id_pais: {
      type: "integer",
      example: 1,
    },
  },
};

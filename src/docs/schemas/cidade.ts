export const cidade = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1,
    },
    nome: {
      type: "string",
      example: "SANTOS",
    },
    estado: {
      type: "string",
      example: "SP",
    },
  },
};

export const cidadeCreation = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1,
    },
    nome: {
      type: "string",
      example: "SANTOS",
    },
    id_estado: {
      type: "integer",
      example: 1,
    },
  },
};

export const cidadeBody = {
  type: "object",
  properties: {
    nome: {
      type: "string",
      example: "SANTOS",
    },
    id_estado: {
      type: "integer",
      example: 1,
    },
  },
};

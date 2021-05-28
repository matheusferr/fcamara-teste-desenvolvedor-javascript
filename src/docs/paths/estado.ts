export const estados = {
  get: {
    tags: ["Estado"],
    summary: "Consulta a lista completa de estados",
    responses: {
      200: {
        description: "Ok",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/schemas/estado",
              },
            },
          },
        },
      },
    },
  },
  post: {
    tags: ["Estado"],
    summary: "Cria um estado",
    consumes: "application/json",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/estadoBody",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Criado",
        content: {
          "application/json": {
            schema: {
              items: {
                $ref: "#/schemas/estadoCreation",
              },
            },
          },
        },
      },
      400: {
        description: "Formato do corpo invalido",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/error400",
            },
          },
        },
      },
    },
  },
};

export const estadoPath = {
  get: {
    tags: ["Estado"],
    summary: "Consulta um estado pelo seu id",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      200: {
        description: "Ok",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/estadoCreation",
            },
          },
        },
      },
      404: {
        description: "Recurso nao encontrado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/error404",
            },
          },
        },
      },
    },
  },
  put: {
    tags: ["Estado"],
    summary: "Atualiza um estado",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "integer",
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/estadoBody",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Ok",
        content: {
          "application/json": {
            schema: {
              items: {
                $ref: "#/schemas/estadoCreation",
              },
            },
          },
        },
      },
      400: {
        description: "Formato do corpo invalido",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/error400",
            },
          },
        },
      },
      404: {
        description: "Recurso nao encontrado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/error404",
            },
          },
        },
      },
    },
  },

  delete: {
    tags: ["Estado"],
    summary: "Remove um estado",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "integer",
        },
      },
    ],
    responses: {
      200: {
        description: "Ok",
        content: {
          "application/json": {
            schema: {
              items: {
                $ref: "#/schemas/estadoCreation",
              },
            },
          },
        },
      },
      404: {
        description: "Recurso nao encontrado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/error404",
            },
          },
        },
      },
    },
  },
};

export const estadoQuery = {
  get: {
    tags: ["Estado"],
    summary: "Consulta um estado pela sua sigla",
    parameters: [
      {
        in: "query",
        name: "sigla",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      200: {
        description: "Ok",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/estado",
            },
          },
        },
      },
      404: {
        description: "Recurso nao encontrado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/error404",
            },
          },
        },
      },
    },
  },
};

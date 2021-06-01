export const cidades = {
  get: {
    tags: ["Cidade"],
    summary: "Consulta a lista completa de cidades",
    responses: {
      200: {
        description: "Ok",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/schemas/cidade",
              },
            },
          },
        },
      },
    },
  },
  post: {
    tags: ["Cidade"],
    summary: "Cria uma cidade",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/cidadeBody",
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
                $ref: "#/schemas/cidadeCreation",
              },
            },
          },
        },
      },
      400: {
        description: "Formato do corpo inválido",
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

export const cidadePath = {
  get: {
    tags: ["Cidade"],
    summary: "Consulta uma cidade pelo seu id",
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
              $ref: "#/schemas/cidadeCreation",
            },
          },
        },
      },
      404: {
        description: "Recurso não encontrado",
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
    tags: ["Cidade"],
    summary: "Atualiza uma cidade",
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
            $ref: "#/schemas/cidadeBody",
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
                $ref: "#/schemas/cidadeCreation",
              },
            },
          },
        },
      },
      400: {
        description: "Formato do corpo inválido",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/error400",
            },
          },
        },
      },
      404: {
        description: "Recurso não encontrado",
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
    tags: ["Cidade"],
    summary: "Remove uma cidade",
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
      204: {
        description: "Recurso deletado",
      },
      404: {
        description: "Recurso não encontrado",
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

export const cidadeQuery = {
  get: {
    tags: ["Cidade"],
    summary: "Consulta uma cidade pelo seu nome",
    parameters: [
      {
        in: "query",
        name: "nome",
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
              $ref: "#/schemas/cidadeCreation",
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

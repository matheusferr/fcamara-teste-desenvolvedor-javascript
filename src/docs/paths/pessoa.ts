export const pessoas = {
  post: {
    tags: ["Pessoa"],
    summary: "Cria uma pessoa",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/pessoaBody",
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
                $ref: "#/schemas/pessoaCreation",
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

export const pessoaPath = {
  get: {
    tags: ["Pessoa"],
    summary: "Consulta uma pessoa pelo seu id",
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
              $ref: "#/schemas/pessoa",
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
    tags: ["Pessoa"],
    summary: "Atualiza uma pessoa",
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
            $ref: "#/schemas/pessoaBody",
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
                $ref: "#/schemas/pessoaCreation",
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
    tags: ["Pessoa"],
    summary: "Remove uma pessoa",
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

export const pessoaQuery = {
  get: {
    tags: ["Pessoa"],
    summary: "Consulta uma pessoa pelo seu cpf",
    parameters: [
      {
        in: "query",
        name: "cpf",
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
              $ref: "#/schemas/pessoa",
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

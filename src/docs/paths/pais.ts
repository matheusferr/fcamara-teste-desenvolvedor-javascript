export const paises = {
  get: {
    tags: ["Pais"],
    summary: "Consulta a lista completa de paises",
    responses: {
      200: {
        description: "Ok",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/schemas/pais",
              },
            },
          },
        },
      },
    },
  },
};

export const paisPath = {
  get: {
    tags: ["Pais"],
    summary: "Consulta um pais pelo seu ID",
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
              $ref: "#/schemas/pais",
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

export const paisQuery = {
  get: {
    tags: ["Pais"],
    summary: "Consulta um pais pela sua sigla",
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
              $ref: "#/schemas/pais",
            },
          },
        },
      },
      404: {
        description: "Recurso nao encontrado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/schemas/error",
            },
          },
        },
      },
    },
  },
};

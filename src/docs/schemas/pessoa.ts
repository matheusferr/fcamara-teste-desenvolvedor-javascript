export const pessoa = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1,
    },
    nome: {
      type: "string",
      example: "Lorem Ipsum",
    },
    cpf: {
      type: "string",
      example: "34414418267",
    },
    email: {
      type: "string",
      example: "lorem.ipsum@dolor.com",
    },
    data_nascimento: {
      type: "string",
      format: "date",
      example: "1622137397021",
    },
    local_nascimento: {
      type: "integer",
    },
    nome_mae: {
      type: "string",
      example: "Consectetur Adipiscing Elit",
    },
    nome_pai: {
      type: "string",
      example: "Phasellus Euismod Sollicitudin",
    },
  },
};

export const pessoaCreation = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1,
    },
    nome: {
      type: "string",
      example: "Lorem Ipsum",
    },
    cpf: {
      type: "string",
      example: "34414418267",
    },
    email: {
      type: "string",
      example: "lorem.ipsum@dolor.com",
    },
    data_nascimento: {
      type: "string",
      format: "date",
      example: "1622137397021",
    },
    local_nascimento: {
      type: "integer",
    },
    nome_mae: {
      type: "string",
      example: "Consectetur Adipiscing Elit",
    },
    nome_pai: {
      type: "string",
      example: "Phasellus Euismod Sollicitudin",
    },
  },
};

export const pessoaBody = {
  type: "object",
  properties: {
    nome: {
      type: "string",
      example: "Lorem Ipsum",
    },
    cpf: {
      type: "string",
      example: "34414418267",
    },
    email: {
      type: "string",
      example: "lorem.ipsum@dolor.com",
    },
    data_nascimento: {
      type: "string",
      format: "date",
      example: "1622137397021",
    },
    local_nascimento: {
      type: "integer",
      example: 1,
    },
    nome_mae: {
      type: "string",
      example: "Consectetur Adipiscing Elit",
    },
    nome_pai: {
      type: "string",
      example: "Phasellus Euismod Sollicitudin",
    },
  },
};

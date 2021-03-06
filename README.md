# Teste para desenvolvedor Javascript

Esse é um teste para que possamos avaliar seus conhecimentos técnicos em Javascript com NodeJS e qualidade do código. Mais importante do que terminar o teste por completo, é entendermos a linha de raciocinio e as praticas de qualidade utilizadas!

## Objetivo

Criar uma API que permita:

- Incluir uma pessoa;
- Consultar uma pessoa pelo identificador;
- Consultar uma pessoa a partir de um dos filtros (Nome / CPF / Data / Pais / Estado / Cidade) (Nenhum filtro é obrigatório)
- Alterar uma pessoa;
- Excluir uma pessoa;

## Pré-requisitos

Para executar a aplicação em seu computador, será necessário ter instalado o [NodeJS](https://nodejs.org), [Yarn](https://yarnpkg.com) e um Banco de Dados (este projeto usa PostgresSQL por padrão).

# Configurando o projeto

## 1 Instale as dependências com o yarn:

```bash
yarn
```

Usuários do Windows precisam instalar o `win-node-env` para que a aplicação possa ler os arquivos de configuração de ambiente:

```bash
yarn add -D win-node-env
```

## 1 - Crie os arquivos `.env.production` e `.env.development` na raíz do projeto com os seguintes valores:

```
DB_DIALECT=dialeto do banco de dados
DB_USER=usuario do banco
DB_PASS=senha do usuario
DB_HOST=endereço do banco de dados
DB_DATABASE=database a ser utilizado
PORT=porta da api
```

Após isso, crie o arquivo `.env.test` com o seguinte valor:

```
DB_DIALECT=sqlite
```

Caso deseje utilizar outro banco de dados, siga as instruções do [Sequelize](https://sequelize.org/master/manual/getting-started.html).

### Exemplo de configuração válida:

```
DB_DIALECT=postgres
DB_USER=psqlUser
DB_PASS=123456
DB_HOST=localhost
DB_DATABASE=fcamaraDev
PORT=4000
```

## 3 - Crie a database e as tabelas no banco:

```bash
yarn dbcreate:dev;
yarn migrate:dev;
yarn dbcreate:prod;
yarn migrate:prod;
```

## 4 - Compile a aplicação:

Após configurar o projeto, a aplicação poderá ser iniciada nos modos desenvolvimento e produção:

- Desenvolvimento: excute o comando `yarn dev`;
- Produção: transpile o projeto de Typescript para Javascript com o comando `yarn build`, e em seguida, inicie a aplicação comando `yarn start`.

# Documentação da API

A documentação do Swagger está disponível na rota `/docs` para leitura e teste com os exemplos interativos.

# Health Status da API

Os status da API e da conexão com o banco de dados está disponível para consulta na rota `/health`.

# Testes

Os testes podem ser executados com os comandos `yarn test` (executa todos os testes uma única vez. Gera coverage) e `yarn test:watch` (executa um ou mais os testes quando houver alterações nos mesmos. Não gera o coverage)

## Dependências

### Principais

- Typescript
- Express
- PostgresSQL
- Sequelize (ORM)
- Swagger
- Jest (Testes unitários)
- Babel
- @godaddy/terminus
### Middlwares Express

- compression
- helmet
- morgan
- swagger-ui-express
- cors

### Outros

- ts-node-dev
- faker
- supertest
- eslint
- prettier

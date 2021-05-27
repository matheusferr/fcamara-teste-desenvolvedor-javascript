export class InvalidCpf extends Error {
  statusCode: number;

  constructor() {
    super();
    this.statusCode = 400;
    this.message = "CPF invalido";
  }
}

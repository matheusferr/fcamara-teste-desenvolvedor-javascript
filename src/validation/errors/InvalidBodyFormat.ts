export class InvalidBodyFormat extends Error {
  statusCode: number;

  constructor() {
    super();
    this.statusCode = 400;
    this.message = "Formato do corpo invalido";
  }
}

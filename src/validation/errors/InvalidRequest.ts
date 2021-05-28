export class InvalidRequest extends Error {
  statusCode: number;

  constructor(message: string) {
    super();
    this.statusCode = 400;
    this.message = message;
  }
}

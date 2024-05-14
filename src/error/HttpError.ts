export abstract class HttpError extends Error {
  status: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.status = statusCode;
  }
}

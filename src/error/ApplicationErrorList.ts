import { ApplicationError } from "./ApplicationError";

export class TicketNotFoundError extends ApplicationError {
  constructor(message: string = "Ticket Not Found.") {
    super(message);
  }
}
export class TicketDeleteError extends ApplicationError {
  constructor(message: string = "Ticket Delete Failed.") {
    super(message);
  }
}

export class TicketUpdateError extends ApplicationError {
  constructor(message: string = "Update Data Error.") {
    super(message);
  }
}

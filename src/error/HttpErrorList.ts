import {
  TicketDeleteError,
  TicketNotFoundError,
  TicketUpdateError,
} from "./ApplicationErrorList";
import { HttpError } from "./HttpError";

export class NotFoundError extends HttpError {
  constructor(err: TicketNotFoundError) {
    super(400, err.message);
  }
}

export class DeleteError extends HttpError {
  constructor(err: TicketDeleteError) {
    super(500, err.message);
  }
}

export class UpdateError extends HttpError {
  status: number = 409;
  constructor(err: TicketUpdateError) {
    super(409, err.message);
  }
}

export class InternalError extends HttpError {
  constructor(err: TicketUpdateError) {
    super(500, err.message);
  }
}

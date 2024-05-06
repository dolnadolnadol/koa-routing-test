import { HttpError } from "routing-controllers";

export class ErrorStatus {
  NotFoundException = new HttpError(404, "Not Found");
}

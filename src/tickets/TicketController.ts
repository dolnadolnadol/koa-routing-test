import {
  DeleteError,
  NotFoundError,
  TicketDeleteError,
  TicketNotFoundError,
  TicketUpdateError,
  UpdateError,
} from "@app/error";
import { myFormattedDate } from "@app/helper/FormattedDate";
import {
  Body,
  Delete,
  Get,
  HttpError,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { Container } from "typedi";
import { TicketService } from "./TicketService";
import {
  PostStatusRequest,
  TicketRequest,
  UpdateTicketRequest,
  UpdateTicketStatusRequest,
} from "./dto/TicketRequest";

@JsonController("/tickets")
export class TicketController {
  @Get("/")
  async getAll() {
    try {
      const serviceInstant = Container.get(TicketService);
      const alltick = await serviceInstant.getAllTickets();
      return alltick;
    } catch (err) {
      console.error(err);
      if (err instanceof TicketNotFoundError) {
        throw new NotFoundError(err);
      } else if (err instanceof HttpError) {
        throw new HttpError(err.httpCode, err.message);
      } else {
        throw new HttpError(500, "internal server error");
      }
    }
  }

  @Get("/:id")
  async getOne(@Param("id") id: number) {
    try {
      const serviceInstant = Container.get(TicketService);
      const tick = await serviceInstant.getTicketbyId(id);
      return tick;
    } catch (err) {
      console.error(err);
      if (err instanceof TicketNotFoundError) {
        throw new NotFoundError(err);
      } else if (err instanceof HttpError) {
        throw new HttpError(err.httpCode, err.message);
      } else {
        throw new HttpError(500, "internal server error");
      }
    }
  }

  @Post("/")
  async post(@Body() ticket: PostStatusRequest) {
    try {
      const serviceInstant = Container.get(TicketService);
      const result = await serviceInstant.addTicket(
        TicketRequest.toRequest(ticket)
      );
      return result;
    } catch (err) {
      console.error(err);
      if (err instanceof TicketNotFoundError) {
        throw new NotFoundError(err);
      } else if (err instanceof HttpError) {
        throw new HttpError(err.httpCode, err.message);
      } else {
        throw new HttpError(500, "internal server error");
      }
    }
  }

  @Put("/:id")
  async updateTicketById(
    @Param("id") id: number,
    @Body() ticket: UpdateTicketRequest
  ) {
    try {
      const serviceInstant = Container.get(TicketService);
      ticket.updated_at = myFormattedDate.myFormattedDate;
      return await serviceInstant.updateTicket(id, ticket);
    } catch (err) {
      if (err instanceof TicketNotFoundError) {
        throw new NotFoundError(err);
      } else {
        throw new HttpError(500, "internal server error");
      }
    }
  }

  @Put("/:id/status")
  async updateStatusById(
    @Param("id") id: number,
    @Body() ticket: UpdateTicketStatusRequest
  ) {
    try {
      const serviceInstant = Container.get(TicketService);
      ticket.updated_at = myFormattedDate.myFormattedDate;
      return await serviceInstant.updateTicketStatusById(id, ticket);
    } catch (err) {
      console.error(err);
      if (err instanceof TicketNotFoundError) {
        throw new NotFoundError(err);
      } else if (err instanceof TicketUpdateError) {
        throw new UpdateError(err);
      } else if (err instanceof HttpError) {
        throw new HttpError(err.httpCode, err.message);
      } else {
        throw new HttpError(500, "internal server error");
      }
    }
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    try {
      const serviceInstant = Container.get(TicketService);
      const result = await serviceInstant.deleteTicket(id);
      if (result) {
        return { message: "delete task successful" };
      }
    } catch (err) {
      console.error(err);
      if (err instanceof TicketDeleteError) {
        throw new DeleteError(err);
      } else if (err instanceof TicketNotFoundError) {
        throw new NotFoundError(err);
      } else if (err instanceof HttpError) {
        throw new HttpError(err.httpCode, err.message);
      } else {
        throw new HttpError(500, "internal server error");
      }
    }
  }
}

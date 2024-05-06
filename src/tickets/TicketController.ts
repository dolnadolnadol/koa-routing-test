import { myFormattedDate } from "@app/helper/FormattedDate";
import "reflect-metadata";
import {
  Body,
  Controller,
  Get,
  HttpError,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { Container } from "typedi";
import { TicketStatus } from "../entities/ITicket";
import { TicketService } from "./TicketService";
import {
  PostStatusRequest,
  UpdateTicketRequest,
  UpdateTicketStatusRequest,
} from "./dto/TicketRequest";

@Controller()
export class TicketController {
  @Get("/tickets")
  async getAll() {
    try {
      const serviceinstant = Container.get(TicketService);
      const alltick = await serviceinstant.getAllTickets();
      return alltick;
    } catch (err) {
      if (err instanceof HttpError) {
        console.error(err);
        throw new HttpError(err.httpCode, err.message);
      }
    }
  }

  @Get("/tickets/:id")
  async getOne(@Param("id") id: number) {
    try {
      const serviceinstant = Container.get(TicketService);
      const tick = await serviceinstant.getTicketbyId(id);
      return tick;
    } catch (err) {
      if (err instanceof HttpError) {
        console.error(err);
        throw new HttpError(err.httpCode, err.message);
      }
    }
  }

  @Post("/tickets")
  async post(@Body() ticket: PostStatusRequest) {
    try {
      const serviceinstant = Container.get(TicketService);
      await serviceinstant.addTicket({
        title: ticket.title,
        description: ticket.description ?? "",
        created_at: myFormattedDate.convertFormattedDate(),
        updated_at: myFormattedDate.convertFormattedDate(),
        status: TicketStatus.PENDING,
      });
      return { message: "Add ticket success" };
    } catch (err) {
      if (err instanceof HttpError) {
        console.error(err);
        throw new HttpError(err.httpCode, err.message);
      }
    }
  }

  @Put("/tickets/:id")
  async put(@Param("id") id: number, @Body() ticket: UpdateTicketRequest) {
    try {
      const serviceinstant = Container.get(TicketService);
      ticket.updated_at = myFormattedDate.convertFormattedDate();
      await serviceinstant.updateTicket(id, ticket);
      return { message: "update success" };
    } catch (err) {
      if (err instanceof HttpError) {
        console.error(err);
        throw new HttpError(err.httpCode, err.message);
      }
    }
  }

  @Put("/tickets/:id/status")
  async updateStatusById(
    @Param("id") id: number,
    @Body() ticket: UpdateTicketStatusRequest
  ) {
    try {
      const serviceinstant = Container.get(TicketService);
      ticket.updated_at = myFormattedDate.convertFormattedDate();
      await serviceinstant.updateTicketStatusById(id, ticket);
      return { message: "update status success" };
    } catch (err) {
      if (err instanceof HttpError) {
        console.error(err);
        throw new HttpError(err.httpCode, err.message);
      }
    }
  }

  // @Delete("/tickets/:id")
  @Put("/tickets/:id/delete")
  async remove(@Param("id") id: number) {
    try {
      const serviceinstant = Container.get(TicketService);
      await serviceinstant.deleteTicket(id);
      return { message: "delete success" };
    } catch (err) {
      if (err instanceof HttpError) {
        console.error(err);
        throw new HttpError(err.httpCode, err.message);
      }
    }
  }
}

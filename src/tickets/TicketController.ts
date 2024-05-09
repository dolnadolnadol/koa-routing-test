import { myFormattedDate } from "@app/helper/FormattedDate";
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
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
  // @Get("/tickets/status")
  // @Header("Access-Control-Allow-Origin", "*")
  // async getAllStatus() {
  //   try {
  //     const serviceInstant = Container.get(TicketService);
  //     const alltickstatus = await serviceInstant.getAllTickets();
  //     return alltickstatus;
  //   } catch (err) {
  //     console.error(err);
  //     if (err instanceof HttpError) {
  //       throw new HttpError(err.httpCode, err.message);
  //     } else {
  //       throw new HttpError(500, "internal server error");
  //     }
  //   }
  // }

  @Get("/tickets")
  @Header("Access-Control-Allow-Origin", "*")
  async getAll() {
    try {
      const serviceInstant = Container.get(TicketService);
      const alltick = await serviceInstant.getAllTickets();
      return alltick;
    } catch (err) {
      console.error(err);
      if (err instanceof HttpError) {
        throw new HttpError(err.httpCode, err.message);
      } else {
        throw new HttpError(500, "internal server error");
      }
    }
  }

  @Get("/tickets/:id")
  @Header("Access-Control-Allow-Origin", "*")
  async getOne(@Param("id") id: number) {
    try {
      const serviceInstant = Container.get(TicketService);
      const tick = await serviceInstant.getTicketbyId(id);
      return tick;
    } catch (err) {
      console.error(err);
      if (err instanceof HttpError) {
        throw new HttpError(err.httpCode, err.message);
      } else {
        throw new HttpError(500, "internal server error");
      }
    }
  }

  @Post("/tickets")
  @Header("Access-Control-Allow-Origin", "*")
  async post(@Body() ticket: PostStatusRequest) {
    try {
      const serviceInstant = Container.get(TicketService);
      await serviceInstant.addTicket({
        title: ticket.title,
        description: ticket.description ?? "",
        created_at: myFormattedDate.myFormattedDate,
        updated_at: myFormattedDate.myFormattedDate,
        status: TicketStatus.PENDING,
      });
      return { message: "Add ticket success" };
    } catch (err) {
      console.error(err);
      if (err instanceof HttpError) {
        throw new HttpError(err.httpCode, err.message);
      } else {
        throw new HttpError(500, "internal server error");
      }
    }
  }

  @Put("/tickets/:id")
  @Header("Access-Control-Allow-Origin", "*")
  async put(@Param("id") id: number, @Body() ticket: UpdateTicketRequest) {
    try {
      const serviceInstant = Container.get(TicketService);
      ticket.updated_at = myFormattedDate.myFormattedDate;
      await serviceInstant.updateTicket(id, ticket);
      return { message: "update success" };
    } catch (err) {
      console.error(err);
      if (err instanceof HttpError) {
        throw new HttpError(err.httpCode, err.message);
      } else {
        throw new HttpError(500, "internal server error");
      }
    }
  }

  @Put("/tickets/:id/status")
  @Header("Access-Control-Allow-Origin", "*")
  async updateStatusById(
    @Param("id") id: number,
    @Body() ticket: UpdateTicketStatusRequest
  ) {
    try {
      const serviceInstant = Container.get(TicketService);
      ticket.updated_at = myFormattedDate.myFormattedDate;
      await serviceInstant.updateTicketStatusById(id, ticket);
      return { message: "update status success" };
    } catch (err) {
      console.error(err);
      if (err instanceof HttpError) {
        throw new HttpError(err.httpCode, err.message);
      } else {
        throw new HttpError(500, "internal server error");
      }
    }
  }

  @Delete("/tickets/:id/delete")
  @Header("Access-Control-Allow-Origin", "*")
  async remove(@Param("id") id: number) {
    try {
      const serviceInstant = Container.get(TicketService);
      await serviceInstant.deleteTicket(id);
      return { message: "delete success" };
    } catch (err) {
      console.error(err);
      if (err instanceof HttpError) {
        throw new HttpError(err.httpCode, err.message);
      } else {
        throw new HttpError(500, "internal server error");
      }
    }
  }
}

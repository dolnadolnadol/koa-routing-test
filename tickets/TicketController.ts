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
  UpdateTicketStatusRequest,
} from "./dto/TicketRequest";

@Controller()
export class TicketController {
  @Get("/tickets")
  async getAll() {
    const serviceinstant = Container.get(TicketService);
    try {
      await serviceinstant.getAllTickets();
      return { message: "getall err" };
    } catch (err) {
      throw new Error("errr to get all");
    }
  }

  @Get("/tickets/:id")
  async getOne(@Param("id") id: number) {
    const serviceinstant = Container.get(TicketService);
    await serviceinstant.getTicketbyId(id);
    return { message: "find id err" };
  }

  @Post("/tickets")
  async post(@Body() user: PostStatusRequest) {
    const date = new Date();
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const myFormattedDate =
      year +
      "-" +
      (monthIndex + 1) +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    const serviceinstant = Container.get(TicketService);
    await serviceinstant.addTicket({
      title: user.title,
      description: user.description ?? "",
      created_at: myFormattedDate,
      status: TicketStatus.PENDING,
    });
    return { message: "post success" };
  }

  @Put("/tickets/:id")
  async put(@Param("id") id: number, @Body() user: UpdateTicketStatusRequest) {
    try {
      const serviceinstant = Container.get(TicketService);
      await serviceinstant.updateTicket(id, user);
      return { message: "update success" };
    } catch (err) {
      if (err instanceof HttpError) {
        console.error(err);
        throw new HttpError(err.httpCode, err.message);
      }
      // console.error(err);
      // throw new Error("internal server error");
    }
  }
  // @Patch("/tickets/:id/status")
  // async updateStatus(@Param("id") id: number, @Body() status: string) {
  //   try {
  //     const serviceinstant = Container.get(TicketService);

  //     await serviceinstant.updateTicket(id, user);
  //     return { message: "update success" };
  //   } catch (err) {
  //     if (err instanceof HttpError) {
  //       throw new HttpError(400, "400 Bad request");
  //     }
  //     console.error(err);
  //     throw new Error("internal server error");
  //   }
  // }

  // @Delete("/tickets/:id")
  @Put("/tickets/:id/delete")
  async remove(@Param("id") id: number) {
    const serviceinstant = Container.get(TicketService);
    await serviceinstant.deleteTicket(id);

    return { message: "delete success" };
  }
}

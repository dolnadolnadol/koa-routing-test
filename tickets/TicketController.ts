import "reflect-metadata";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { ITicket } from "../entities/ITicket";
import { TicketService } from "./TicketService";

@Controller()
export class TicketController {
  @Get("/tickets")
  getAll() {
    // new UserService();
    // return 'This action returns all users';
    let service = new TicketService();
    return service.getAllTickets();
  }

  @Get("/tickets/:id")
  getOne(@Param("id") id: number) {
    // return 'This action returns user #' + id;
    let service = new TicketService();
    return service.getTicketbyId(id);
  }

  @Post("/tickets")
  async post(@Body() user: ITicket) {
    // return 'Saving user...';
    let service = new TicketService();
    await service.addTicket({
      title: user.title,
      description: user.description ?? "",
      created_at: new Date().toString(),
      status: user.status,
    });
    return { message: "post success" };
  }

  @Put("/tickets/:id")
  put(@Param("id") id: number, @Body() user: ITicket) {
    // return 'Updating a user...';
    let service = new TicketService();
    return service.updateTicket(id, user);
  }

  @Delete("/tickets/:id")
  remove(@Param("id") id: number) {
    let service = new TicketService();
    return service.deleteTicket(id);
  }
}

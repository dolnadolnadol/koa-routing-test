import "reflect-metadata";
import { Body, Controller, Get, Param, Post, Put } from "routing-controllers";
import { Container } from "typedi";
import { ITicket } from "../entities/ITicket";
import { SingletonTicketService } from "./TicketService";

@Controller()
export class TicketController {
  @Get("/tickets")
  getAll() {
    // let service = new TicketService();
    // return service.getAllTickets();

    let serviceinstant = Container.get(SingletonTicketService);
    return serviceinstant.injectedService.getAllTickets();
  }

  @Get("/tickets/:id")
  getOne(@Param("id") id: number) {
    // let service = new TicketService();
    // return service.getTicketbyId(id);

    let serviceinstant = Container.get(SingletonTicketService);
    return serviceinstant.injectedService.getTicketbyId(id);
  }

  @Post("/tickets")
  async post(@Body() user: ITicket) {
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

    // let service = new TicketService();
    // await service.addTicket({
    //   title: user.title,
    //   description: user.description ?? "",
    //   created_at: myFormattedDate,
    //   status: user.status,
    // });

    let serviceinstant = Container.get(SingletonTicketService);
    serviceinstant.injectedService.addTicket({
      title: user.title,
      description: user.description ?? "",
      created_at: myFormattedDate,
      status: user.status,
    });
    return { message: "post success" };
  }

  @Put("/tickets/:id")
  put(@Param("id") id: number, @Body() user: ITicket) {
    // let service = new TicketService();
    // service.updateTicket(id, user);

    let serviceinstant = Container.get(SingletonTicketService);
    serviceinstant.injectedService.updateTicket(id, user);

    return { message: "update success" };
  }

  // @Delete("/tickets/:id")
  @Put("/tickets/:id/delete")
  remove(@Param("id") id: number) {
    // let service = new TicketService();
    // service.deleteTicket(id);

    let serviceinstant = Container.get(SingletonTicketService);
    serviceinstant.injectedService.deleteTicket(id);

    return { message: "delete success" };
  }
}

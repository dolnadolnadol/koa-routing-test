import { HttpError } from "routing-controllers";
import { Service } from "typedi";
import { ITicket } from "../entities/ITicket";
import { TicketRepository } from "./TicketRepository";

@Service()
export class TicketService {
  async getAllTickets() {
    const repo = new TicketRepository();
    return repo.list();
  }
  async getTicketbyId(id: number): Promise<ITicket> {
    const repo = new TicketRepository();
    return repo.findById(id);
  }
  async addTicket(ticket: ITicket) {
    const repo = new TicketRepository();
    return repo.create(ticket);
  }
  async updateTicket(id: number, ticket: Partial<ITicket>) {
    const repo = new TicketRepository();
    await this.getTicketbyId(id).then((data) => {
      if (data.status == "PENDING") {
        if (ticket.status != "IN_PROGRESS" && ticket.status != "CANCELLED") {
          throw new HttpError(400, "cant change status");
        }
      } else if (data.status == "IN_PROGRESS") {
        if (ticket.status != "COMPLETED" && ticket.status != "CANCELLED") {
          throw new HttpError(400, "cant change status");
        }
      } else if (data.status != "COMPLETED" && data.status != "CANCELLED") {
        throw new HttpError(400, "cant change status");
      }
    });
    return repo.updateById(id, ticket);
  }
  deleteTicket(id: number) {
    const repo = new TicketRepository();
    return repo.deleteById(id);
  }
}

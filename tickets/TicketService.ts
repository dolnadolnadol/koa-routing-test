import { ITicket } from "../entities/ITicket";
import { TicketRepository } from "./TicketRepository";

export class TicketService {
  async getAllTickets() {
    let repo = new TicketRepository();
    return repo.list();
  }
  async getTicketbyId(id: number): Promise<ITicket> {
    let repo = new TicketRepository();
    return repo.findById(id);
  }
  addTicket(user: ITicket) {
    let repo = new TicketRepository();
    return repo.create(user);
  }
  updateTicket(id: number, user: Partial<ITicket>) {
    let repo = new TicketRepository();
    return repo.updateById(id, user);
  }
  deleteTicket(id: number) {
    let repo = new TicketRepository();
    return repo.deleteById(id);
  }
}

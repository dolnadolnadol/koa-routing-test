import { ITicket, TicketStatus } from "@app/entities/ITicket";
import { TicketRepository } from "@app/tickets/TicketRepository";
import { TicketResponse } from "@app/tickets/dto/TicketResponse";
import _ from "lodash";
import { HttpError } from "routing-controllers";
import { Service } from "typedi";
@Service()
export class TicketService {
  async getAllTickets() {
    const repo = new TicketRepository();
    const lst = await repo.list();
    const new_lst = lst.map((each) => TicketResponse.toResponse(each));
    return new_lst;
  }
  async getTicketbyId(id: number): Promise<ITicket> {
    const repo = new TicketRepository();
    const result = await repo.findById(id);
    return TicketResponse.toResponse(result);
  }
  async addTicket(ticket: ITicket) {
    const repo = new TicketRepository();
    return repo.create(ticket);
  }
  async updateTicket(id: number, ticket: Partial<ITicket>) {
    const repo = new TicketRepository();
    const pickedTicket = _.pickBy(ticket, (row) => !!row);
    return repo.updateById(id, pickedTicket);
  }
  async updateTicketStatusById(id: number, ticket: Partial<ITicket>) {
    const repo = new TicketRepository();
    await this.getTicketbyId(id).then((data) => {
      if (data.status == TicketStatus.PENDING) {
        if (
          ticket.status != TicketStatus.IN_PROGRESS &&
          ticket.status != TicketStatus.CANCELLED
        ) {
          throw new HttpError(400, "cant change status");
        }
      } else if (data.status == TicketStatus.IN_PROGRESS) {
        if (
          ticket.status != TicketStatus.COMPLETED &&
          ticket.status != TicketStatus.CANCELLED
        ) {
          throw new HttpError(400, "cant change status");
        }
      } else if (
        data.status == TicketStatus.COMPLETED ||
        data.status == TicketStatus.CANCELLED
      ) {
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

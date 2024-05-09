import { ITicket, TicketStatus } from "@app/entities/ITicket";
import { TicketRepository } from "@app/tickets/TicketRepository";
import { TicketResponse } from "@app/tickets/dto/TicketResponse";
import _ from "lodash";
import { HttpError } from "routing-controllers";
import { Service } from "typedi";
@Service()
export class TicketService {
  repo: TicketRepository;
  constructor() {
    this.repo = new TicketRepository();
  }
  // async getAllStatus(){
  //   const status = await this.repo.getStatus();
  //   return status;
  // }
  async getAllTickets() {
    const list = await this.repo.list();
    const result = list.map((each) => TicketResponse.toResponse(each));
    return result;
  }
  async getTicketbyId(id: number): Promise<ITicket> {
    const result = await this.repo.findById(id);
    return TicketResponse.toResponse(result);
  }
  async addTicket(ticket: ITicket) {
    const result = await this.repo.create(ticket);
    // console.log("add0 " + result);
    return result;
  }
  async updateTicket(id: number, ticket: Partial<ITicket>) {
    const pickedTicket = _.pickBy(ticket, (row) => !!row);
    return await this.repo.updateById(id, pickedTicket);
  }
  async updateTicketStatusById(id: number, ticket: Partial<ITicket>) {
    const data = await this.getTicketbyId(id);
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
    return this.repo.updateById(id, ticket);
  }
  deleteTicket(id: number) {
    return this.repo.deleteById(id);
  }
}

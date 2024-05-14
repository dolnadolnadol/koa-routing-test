import { ITicket, TicketStatus } from "@app/entities/ITicket";
import {
  TicketDeleteError,
  TicketNotFoundError,
  TicketUpdateError,
} from "@app/error";
import _ from "lodash";
import { Service } from "typedi";
import { TicketResponse } from "./dto/TicketResponse";
import { TicketRepository } from "./TicketRepository";

@Service()
export class TicketService {
  repo: TicketRepository;
  constructor() {
    this.repo = new TicketRepository();
  }
  async getAllTickets() {
    const list = await this.repo.list();
    const result = list.map((each: ITicket) => TicketResponse.toResponse(each));
    if (!result) {
      throw new TicketNotFoundError();
    }
    return result;
  }
  async getTicketbyId(id: number): Promise<ITicket> {
    const result = await this.repo.findById(id);
    if (!result) {
      throw new TicketNotFoundError();
    }
    return TicketResponse.toResponse(result);
  }
  async addTicket(ticket: ITicket) {
    const result = await this.repo.create(ticket);
    if (!result) {
      throw new TicketDeleteError();
    }
    const data = await this.repo.findById(result);
    if (!data) {
      throw new TicketDeleteError();
    }
    return TicketResponse.toResponse(data);
  }
  async updateTicket(id: number, ticket: Partial<ITicket>) {
    const pickedTicket = _.pickBy(ticket, (row) => !!row);
    const data = await this.repo.findById(id);
    if (!data) {
      throw new TicketNotFoundError();
    }
    const result = await this.repo.updateById(id, pickedTicket);
    if (!result) {
      throw new TicketUpdateError();
    }
    const updatedData = await this.repo.findById(id);
    return TicketResponse.toResponse(updatedData);
  }
  async updateTicketStatusById(id: number, ticket: Partial<ITicket>) {
    const data = await this.repo.findById(id);
    if (!data) {
      throw new TicketNotFoundError();
    }
    if (data.status == TicketStatus.PENDING) {
      if (
        ticket.status != TicketStatus.IN_PROGRESS &&
        ticket.status != TicketStatus.CANCELLED
      ) {
        throw new TicketUpdateError(
          `Cannot Change Status From PENDING to ${data.status}`
        );
      }
    } else if (data.status == TicketStatus.IN_PROGRESS) {
      if (
        ticket.status != TicketStatus.COMPLETED &&
        ticket.status != TicketStatus.CANCELLED
      ) {
        throw new TicketUpdateError(
          `Cannot Change Status From IN_PROGRESS to ${data.status}`
        );
      }
    } else if (
      data.status == TicketStatus.COMPLETED ||
      data.status == TicketStatus.CANCELLED
    ) {
      throw new TicketUpdateError(
        `Cannot Change Status From COMPLETED Or CANCELLED to ${data.status}`
      );
    }
    const result = await this.repo.updateById(id, ticket);
    if (!result) {
      throw new TicketNotFoundError();
    }
    const updatedData = await this.repo.findById(id);
    return TicketResponse.toResponse(updatedData);
  }
  async deleteTicket(id: number) {
    const data = await this.repo.findById(id);
    if (!data) {
      throw new TicketNotFoundError();
    }
    const result = await this.repo.deleteById(id);
    if (!result) {
      throw new TicketDeleteError();
    }
    return result;
  }
}

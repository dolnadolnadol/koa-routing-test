import knex from "knex";
import { ITicket } from "../entities/ITicket";
import config from "../knexfile";
import { ITicketRepository } from "../repositories/ITicketRepository";

export class TicketRepository implements ITicketRepository {
  async list(): Promise<ITicket[]> {
    return knex(config)<ITicket>("tickets")
      .select("*")
      .where("isDelete", false);
  }
  async findById(id: number): Promise<ITicket> {
    return knex(config)<ITicket>("tickets")
      .first()
      .where("ticket_id", id)
      .select("*");
  }
  async create(ticket: ITicket): Promise<void> {
    return knex(config)("tickets").insert(ticket);
  }
  async updateById(id: number, ticket: Partial<ITicket>): Promise<void> {
    return knex(config)("tickets").where("ticket_id", id).update(ticket);
  }
  async deleteById(id: number): Promise<void> {
    return knex(config)("tickets")
      .where("ticket_id", id)
      .update("isDelete", true);
  }
}

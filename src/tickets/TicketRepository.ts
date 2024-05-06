import { ITicket } from "@app/entities/ITicket";
import { ITicketRepository } from "@app/repositories/ITicketRepository";
import config from "@knex/knexfile";
import knex from "knex";

export class TicketRepository implements ITicketRepository {
  async list(): Promise<ITicket[]> {
    return (
      knex(config)<ITicket>("tickets")
        // .select("*")
        .where("isDelete", false)
    );
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

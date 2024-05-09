import { ITicket } from "@app/entities/ITicket";
import { ITicketRepository } from "@app/repositories/ITicketRepository";
import { Database } from "@app/sql/Database";
import Container from "typedi";

export class TicketRepository implements ITicketRepository {
  // async getStatus(): Promise<ITicket[]> {
  //   const db = Container.get(Database);
  //   return db.kn<ITicket>("tickets").where("is_delete", false);
  // }
  async list(): Promise<ITicket[]> {
    const db = Container.get(Database);
    return db.kn<ITicket>("tickets").where("is_delete", false);
  }
  async findById(id: number): Promise<ITicket> {
    const db = Container.get(Database);
    return db.kn<ITicket>("tickets").first().where("ticket_id", id).select("*");
  }
  async create(ticket: ITicket): Promise<any> {
    const db = Container.get(Database);
    return db.kn("tickets").insert(ticket);
  }
  async updateById(id: number, ticket: Partial<ITicket>): Promise<any> {
    const db = Container.get(Database);
    return db.kn("tickets").where("ticket_id", id).update(ticket);
  }
  async deleteById(id: number): Promise<void> {
    const db = Container.get(Database);
    return db.kn("tickets").where("ticket_id", id).update("is_delete", true);
  }
}

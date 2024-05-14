import { ITicket } from "@app/entities/ITicket";
import { ITicketRepository } from "@app/repositories/ITicketRepository";
import { Database } from "@app/sql/Database";
import Container from "typedi";

export class TicketRepository implements ITicketRepository {
  async list(): Promise<ITicket[]> {
    const db = Container.get(Database);
    return db.kn<ITicket>("tickets").where("is_delete", false).select("*");
    // .select([
    //   "ticket_id",
    //   "title",
    //   "description",
    //   "created_at",
    //   "updated_at",
    //   "status",
    // ]);
  }
  async findById(id: number): Promise<ITicket> {
    const db = Container.get(Database);
    return db
      .kn<ITicket>("tickets")
      .first()
      .where("ticket_id", id)
      .andWhere("is_delete", false)
      .select("*");
    // .select([
    //   "ticket_id",
    //   "title",
    //   "description",
    //   "created_at",
    //   "updated_at",
    //   "status",
    // ]);
  }
  async create(ticket: ITicket): Promise<number> {
    const db = Container.get(Database);
    const [result] = await db.kn("tickets").insert(ticket);
    return result;
  }
  async updateById(id: number, ticket: Partial<ITicket>): Promise<number> {
    const db = Container.get(Database);
    const result = db.kn("tickets").where("ticket_id", id).update(ticket);
    return result;
  }
  async deleteById(id: number): Promise<number> {
    const db = Container.get(Database);
    return db.kn("tickets").where("ticket_id", id).update("is_delete", true);
  }
}

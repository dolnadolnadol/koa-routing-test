import { ITicket } from "../entities/ITicket";
import { TicketQueryOption } from "../tickets/query/TicketQueryOption";

export interface ITicketRepository {
  list(option: TicketQueryOption): Promise<ITicket[]>;
  findById(id: number): Promise<ITicket>;
  create(room: ITicket): Promise<number>;
  updateById(id: number, room: Partial<ITicket>): Promise<number>;
  deleteById(id: number): Promise<number>;
}

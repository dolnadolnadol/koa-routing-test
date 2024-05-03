import { ITicket } from "../entities/ITicket";
import { TicketQueryOption } from "../tickets/query/TicketQueryOption";

export interface ITicketRepository {
  list(option: TicketQueryOption): Promise<ITicket[]>;
  findById(id: number): Promise<ITicket>;
  create(room: ITicket): Promise<void>;
  updateById(id: number, room: Partial<ITicket>): Promise<void>;
  deleteById(id: number): Promise<void>;
}

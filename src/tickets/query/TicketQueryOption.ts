import { TicketStatus } from "../../entities/ITicket";
export interface TicketQueryOption {
  ticket_id?: number;
  title: string;
  description?: string;
  created_at: string;
  updated_at?: string;
  status: TicketStatus;
  isDelete: boolean;
}

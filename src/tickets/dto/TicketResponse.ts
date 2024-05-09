import { ITicket, TicketStatus } from "../../entities/ITicket";

interface ITicketResponse {
  ticket_id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  status: TicketStatus;
}
export class TicketResponse {
  static toResponse(tickets: ITicket): ITicketResponse {
    const tickerResponse: ITicketResponse = {
      ticket_id: tickets.ticket_id,
      title: tickets.title,
      created_at: tickets.created_at,
      description: tickets.description ?? "",
      updated_at: tickets.updated_at ?? "",
      status: tickets.status,
    };
    return tickerResponse;
  }
}

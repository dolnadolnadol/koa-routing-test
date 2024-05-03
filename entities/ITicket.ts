export enum enum_ticket_status {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface ITicket {
  ticket_id?: number;
  title: string;
  description?: string;
  created_at: string;
  updated_at?: string;
  status: enum_ticket_status;
}

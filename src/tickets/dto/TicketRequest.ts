import { NotAllow } from "@app/decorators/NotAllow";
import { myFormattedDate } from "@app/helper/FormattedDate";
import { Expose } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ITicket, TicketStatus } from "../../entities/ITicket";

export class PostStatusRequest {
  @Expose({ name: "title" })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Expose({ name: "description" })
  @IsOptional()
  description?: string;

  @NotAllow()
  ticket_id: string;

  @NotAllow()
  status: TicketStatus;

  @NotAllow()
  updated_at: string;

  @NotAllow()
  created_at: string;
}
export class UpdateTicketStatusRequest {
  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @NotAllow()
  updated_at: string;
}
export class UpdateTicketRequest {
  @Expose({ name: "title" })
  @IsString()
  @IsOptional()
  title?: string;

  @Expose({ name: "description" })
  @IsOptional()
  description?: string;

  @NotAllow()
  status: TicketStatus;

  @NotAllow()
  updated_at: string;

  @NotAllow()
  created_at: string;
}

export class TicketRequest {
  static toRequest(tickets: PostStatusRequest): ITicket {
    const tickerRequest: ITicket = {
      title: tickets.title,
      description: tickets.description ?? "",
      created_at: myFormattedDate.myFormattedDate,
      updated_at: myFormattedDate.myFormattedDate,
      status: TicketStatus.PENDING,
    };
    return tickerRequest;
  }
}

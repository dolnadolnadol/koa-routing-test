import { Expose } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TicketStatus } from "../../entities/ITicket";

export class PostStatusRequest {
  @Expose({ name: "title" })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Expose({ name: "description" })
  @IsOptional()
  description?: string;
}
export class UpdateTicketStatusRequest {
  //   @Expose({ name: "status" })
  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;
}

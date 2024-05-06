import { NotAllow } from "@app/decorators/NotAllow";
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

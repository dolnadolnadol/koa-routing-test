// // import { ReservationQueryOption } from "@app/modules/reservations/query/ReservationQueryOption";
// // import { IReservation } from "../entities/IReservation";

import { IUser } from "../entities/IUser";
import { UserQueryOption } from "../user/query/UserQueryOption";

export interface IUserRepository {
  list(option: UserQueryOption): Promise<IUser[]>;
  findById(id: number): Promise<IUser>;
  create(room: IUser): Promise<void>;
  updateById(id: number, room: Partial<IUser>): Promise<void>;
  deleteById(id: number): Promise<void>;
}

import config from "@knex/knexfile";
import knex from "knex";
import { IUser } from "../entities/IUser";
import { IUserRepository } from "../repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  async list(): Promise<IUser[]> {
    return knex(config)<IUser>("users").select("*").where("is_delete", false);
  }
  async findById(id: number): Promise<IUser> {
    return knex(config)<IUser>("users")
      .first()
      .where("user_id", id)
      .select("*");
  }
  async create(user: IUser): Promise<void> {
    return knex(config)("users").insert(user);
  }
  async updateById(id: number, user: Partial<IUser>): Promise<void> {
    return knex(config)("users").where({ user_id: id }).update(user);
  }
  async deleteById(id: number): Promise<void> {
    return knex(config)("users").where("user_id", id).del();
  }
}

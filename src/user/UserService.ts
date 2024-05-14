import { IUser } from "../entities/IUser";
import { UserRepository } from "./UserRepository";

export class UserService {
  async getAllUsers() {
    let repo = new UserRepository();
    return repo.list();
  }
  async getUserbyId(id: number): Promise<IUser> {
    let repo = new UserRepository();
    return repo.findById(id);
  }
  addUser(user: IUser) {
    let repo = new UserRepository();
    return repo.create(user);
  }
  updateUser(id: number, user: Partial<IUser>) {
    let repo = new UserRepository();
    return repo.updateById(id, user);
  }
  deleteUser(id: number) {
    let repo = new UserRepository();
    return repo.deleteById(id);
  }
}

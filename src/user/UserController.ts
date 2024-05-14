import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { IUser } from "../entities/IUser";
import { UserService } from "./UserService";

@Controller()
export class UserController {
  @Get("/users")
  getAll() {
    // new UserService();
    // return 'This action returns all users';
    let service = new UserService();
    return service.getAllUsers();
  }

  @Get("/users/:id")
  getOne(@Param("id") id: number) {
    // return 'This action returns user #' + id;
    let service = new UserService();
    return service.getUserbyId(id);
  }

  @Post("/users")
  async post(@Body() user: IUser) {
    // return 'Saving user...';
    let service = new UserService();
    await service.addUser(user);
    return { message: "POST SUCCESS" };
  }

  @Put("/users/:id")
  async put(@Param("id") id: number, @Body() user: IUser) {
    // return 'Updating a user...';
    let service = new UserService();
    await service.updateUser(id, user);
    return { message: "PUT SUCCESS" };
  }

  @Delete("/users/:id")
  async remove(@Param("id") id: number) {
    let service = new UserService();
    await service.deleteUser(id);
    return { message: "DELETE SUCCESS" };
  }
}

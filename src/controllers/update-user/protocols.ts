import { User } from "@/models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IUpdateUserController {
  handle(HttpRequest: HttpRequest<unknown>): Promise<HttpResponse<User>>;
}

export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}

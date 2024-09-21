import { User } from "@/models/user";
import { HttpResponse } from "../protocols";

export interface UpdateUserController {
  handle(): Promise<HttpResponse<User>>;
}

export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}

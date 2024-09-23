/* eslint-disable no-unsafe-optional-chaining */
import { User } from "@/models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";
import { badRequest, okResponse, serverError } from "../helpers";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  async handle(
    httpRequest: HttpRequest<unknown>,
  ): Promise<HttpResponse<User | string>> {
    try {
      const { id } = httpRequest?.params;

      if (!id) return badRequest("Missing user id");

      const user = await this.deleteUserRepository.deleteUser(id);

      return okResponse<User>(user);
    } catch (_error) {
      return serverError();
    }
  }
}

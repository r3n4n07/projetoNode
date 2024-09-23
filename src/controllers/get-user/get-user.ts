/* eslint-disable no-unsafe-optional-chaining */
import { User } from "@/models/user";
import { badRequest, okResponse, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IGetUserRepository } from "./protocols";

export class GetUserController implements IController {
  constructor(private readonly getUserRepository: IGetUserRepository) {}

  async handle(
    httpRequest: HttpRequest<string>,
  ): Promise<HttpResponse<User | string>> {
    try {
      const { id } = httpRequest?.params;

      if (!id) return badRequest("Missing user id");

      const user = await this.getUserRepository.getUser(id);

      return okResponse<User>(user);
    } catch (_error) {
      return serverError();
    }
  }
}

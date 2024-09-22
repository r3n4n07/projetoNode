/* eslint-disable no-unsafe-optional-chaining */
import { User } from "@/models/user";
import { badRequest, okResponse, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { getUserSchema } from "./get-user-schema";
import { IGetUserRepository } from "./protocols";

export class GetUserController implements IController {
  constructor(private readonly getUserRepository: IGetUserRepository) {}

  async handle(
    httpRequest: HttpRequest<string>,
  ): Promise<HttpResponse<User | string>> {
    try {
      const { id } = httpRequest?.params;

      const validateId = getUserSchema.safeParse(id);

      if (!validateId.success)
        return badRequest(validateId.error.errors[0].message);

      const user = await this.getUserRepository.getUser(id);

      return okResponse<User>(user);
    } catch (_error) {
      return serverError();
    }
  }
}

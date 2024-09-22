import { User } from "@/models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import { createUserSchema } from "./create-user-schema";
import { badRequest, created, serverError } from "../helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    HttpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User | string>> {
    try {
      const { body } = HttpRequest;

      const result = createUserSchema.safeParse(body);

      if (!result.success) {
        return badRequest(result.error?.errors[0].message);
      }

      const user = await this.createUserRepository.createUser(result.data);

      return created<User>(user);
    } catch (_error) {
      return serverError();
    }
  }
}

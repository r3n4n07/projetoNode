import { User } from "@/models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import { createUserSchema } from "./create-user-schema";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async handle(
    HttpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      const { body } = HttpRequest;

      const result = createUserSchema.safeParse(body);

      if (!result.success) {
        return {
          statusCode: 400,
          body: result.error?.errors[0].message,
        };
      }

      const user = await this.createUserRepository.createUser(result.data);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (_error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}

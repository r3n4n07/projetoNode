import { User } from "@/models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";
import { userSchema } from "../schemas/userSchema";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async handle(
    HttpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      const { body } = HttpRequest;

      const result = userSchema.safeParse(body);

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

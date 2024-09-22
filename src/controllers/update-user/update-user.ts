import { User } from "@/models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";
import { updateUserParamsSchema, updateUserSchema } from "./update-user-schema";
import { badRequest, okResponse, serverError } from "../helpers";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserParams>,
  ): Promise<HttpResponse<User | string>> {
    try {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { id } = httpRequest?.params;
      const { body } = httpRequest;

      const validateId = updateUserParamsSchema.safeParse(id);
      const validateBody = updateUserSchema.safeParse(body);

      if (!validateId.success) {
        return badRequest(validateId.error.errors[0].message);
      }

      if (!validateBody.success) {
        return badRequest(validateBody.error.errors[0].message);
      }

      const user = await this.updateUserRepository.updateUser(
        id,
        validateBody.data,
      );

      return okResponse<User>(user);
    } catch (_error) {
      return serverError();
    }
  }
}

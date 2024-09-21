/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { IUpdateUserController, IUpdateUserRepository } from "./protocols";
import { updateUserParamsSchema, updateUserSchema } from "./update-user-schema";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { id } = httpRequest?.params;
      const { body } = httpRequest;

      const validateId = updateUserParamsSchema.safeParse(id);
      const validateBody = updateUserSchema.safeParse(body);
      if (!validateId.success) {
        return {
          statusCode: 400,
          body: validateId.error.errors[0].message,
        };
      }

      if (!validateBody.success) {
        return {
          statusCode: 400,
          body: validateBody.error.errors[0].message,
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (_error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}

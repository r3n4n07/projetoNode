import { IGetUsersController, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (_error) /*ainda estou tendo o erro aqui,*/ {
      return {
        statusCode: 200,
        body: "something went wrong!",
      };
    }
  }
}

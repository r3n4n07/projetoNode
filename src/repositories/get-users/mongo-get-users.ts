import { IGetUsersRepository } from "@/controllers/get-users/protocols";
import { User } from "@/models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Renan",
        lastName: "Pereira",
        email: "renan07102002@gmail.com",
        password: "123456",
      },
    ];
  }
}

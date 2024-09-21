import { IGetUsersRepository } from "@/controllers/get-users/protocols";
import { MongoClient } from "@/database/mongo";
import { User } from "@/models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    /**
     * Retrieve all users from the "users" collection
     */
    const users = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .find({})
      .toArray();

    /**
     * Return a new array where _id is replaced with id
     */
    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}

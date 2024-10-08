import { IGetUsersRepository } from "@/controllers/get-users/protocols";
import { MongoClient } from "@/database/mongo";
import { User } from "@/models/user";
import { MongoUser } from "../mongo-protocols";
import { fixUserResponseArr } from "../helpers";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    /**
     * Retrieve all users from the "users" collection
     */
    const users = await MongoClient.db
      .collection<MongoUser>("users")
      .find({})
      .toArray();

    /**
     * Return a new array where _id is replaced with id
     */
    return fixUserResponseArr(users);
  }
}

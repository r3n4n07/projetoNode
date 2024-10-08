import {
  CreateUserParams,
  ICreateUserRepository,
} from "@/controllers/create-user/protocols";
import { MongoClient } from "@/database/mongo";
import { User } from "@/models/user";
import { MongoUser } from "../mongo-protocols";
import { fixUserResponse } from "../helpers";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    /**
     * Create a user in the "users" collection with the provided params
     */
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    /**
     * Retrieve the created user
     */
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId });

    if (!user) throw new Error("User not created");

    /**
     * Return a new user where _id is replaced with id
     */
    return fixUserResponse(user);
  }
}

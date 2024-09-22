import {
  CreateUserParams,
  ICreateUserRepository,
} from "@/controllers/create-user/protocols";
import { MongoClient } from "@/database/mongo";
import { User } from "@/models/user";
import { MongoUser } from "../mongo-protocols";

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

    /**
     *  if the user not created, throw an error
     */

    if (!user) throw new Error("User not created");

    /**
     * if the user was created, destructure the object to replace the _id attribute with id
     */
    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}

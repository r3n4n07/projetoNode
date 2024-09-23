import { IGetUserRepository } from "@/controllers/get-user/protocols";
import { MongoClient } from "@/database/mongo";
import { User } from "@/models/user";
import { ObjectId } from "mongodb";
import { fixUserResponse } from "../helpers";
import { MongoUser } from "../mongo-protocols";

export class MongoGetUserRepository implements IGetUserRepository {
  async getUser(id: string): Promise<User> {
    /**
     * Retrieve a user from the "users" colletion
     */
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) throw new Error("user not found");

    /**
     * Return a new user where _id is replaced with id
     */
    return fixUserResponse(user);
  }
}

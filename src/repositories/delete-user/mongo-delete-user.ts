import { IDeleteUserRepository } from "@/controllers/delete-user/protocols";
import { MongoClient } from "@/database/mongo";
import { User } from "@/models/user";
import { ObjectId } from "mongodb";
import { MongoUser } from "../mongo-protocols";
import { fixUserResponse } from "../helpers";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    /**
     * Retrieve a user from the "users" colletion
     */
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found");
    }

    /**
     * Delete a user from the "users" collection
     */
    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("User not deleted");
    }

    /**
     * Return a new user where _id is replaced with id
     */
    return fixUserResponse(user);
  }
}

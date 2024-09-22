import { IDeleteUserRepository } from "@/controllers/delete-user/protocols";
import { MongoClient } from "@/database/mongo";
import { User } from "@/models/user";
import { ObjectId } from "mongodb";
import { MongoUser } from "../mongo-protocols";
import { fixUserResponse } from "../helpers";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("User not deleted");
    }

    return fixUserResponse(user);
  }
}

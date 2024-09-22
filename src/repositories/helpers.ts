import { WithId } from "mongodb";
import { MongoUser } from "./mongo-protocols";
import { User } from "@/models/user";

export const fixUserResponse = (user: WithId<MongoUser>): User => {
  const { _id, ...rest } = user;
  return { id: _id.toHexString(), ...rest };
};

export const fixUserResponseArr = (user: WithId<MongoUser>[]): User[] => {
  return user.map(({ _id, ...rest }) => ({
    ...rest,
    id: _id.toHexString(),
  }));
};

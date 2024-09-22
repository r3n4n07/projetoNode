import { CreateUserController } from "@/controllers/create-user/create-user";
import { DeleteUserController } from "@/controllers/delete-user/delete-user";
import { GetUserController } from "@/controllers/get-user/get-user";
import { GetUsersController } from "@/controllers/get-users/get-users";
import { UpdateUserController } from "@/controllers/update-user/update-user";
import { MongoCreateUserRepository } from "@/repositories/create-user/mongo-create-users";
import { MongoDeleteUserRepository } from "@/repositories/delete-user/mongo-delete-user";
import { MongoGetUserRepository } from "@/repositories/get-user/mongo-get-user-repository";
import { MongoGetUsersRepository } from "@/repositories/get-users/mongo-get-users";
import { MongoUpdateUserRepository } from "@/repositories/update-user/mongo-update-user";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", async (_req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUsersRepository);
  const { body, statusCode } = await getUsersController.handle();
  res.status(statusCode).send(body);
});

userRoutes.get("/:id", async (req, res) => {
  const mongoGetUserRepository = new MongoGetUserRepository();
  const getUserController = new GetUserController(mongoGetUserRepository);
  const { body, statusCode } = await getUserController.handle({
    params: req.params,
  });
  res.status(statusCode).send(body);
});

userRoutes.post("/create", async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository();
  const createUserController = new CreateUserController(
    mongoCreateUserRepository,
  );
  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });
  res.status(statusCode).send(body);
});

userRoutes.patch("/update/:id", async (req, res) => {
  const mongoUpdateUserRepository = new MongoUpdateUserRepository();
  const updateUserController = new UpdateUserController(
    mongoUpdateUserRepository,
  );
  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  });
  res.status(statusCode).send(body);
});

userRoutes.delete("/delete/:id", async (req, res) => {
  const mongoDeleteUserRepository = new MongoDeleteUserRepository();
  const deleteUserController = new DeleteUserController(
    mongoDeleteUserRepository,
  );
  const { body, statusCode } = await deleteUserController.handle({
    body: req.body,
    params: req.params,
  });
  res.status(statusCode).send(body);
});

export { userRoutes };

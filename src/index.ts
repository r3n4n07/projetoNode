import express, { Request, Response } from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-users";
import { CreateUserController } from "./controllers/create-user/create-user";
import { MongoUpdateUserRepository } from "./repositories/update-user/mongo-update-user";
import { UpdateUserController } from "./controllers/update-user/update-user";
import { MongoDeleteUserRepository } from "./repositories/delete-user/mongo-delete-user";
import { DeleteUserController } from "./controllers/delete-user/delete-user";
import { MongoGetUserRepository } from "./repositories/get-user/mongo-get-user-repository";
import { GetUserController } from "./controllers/get-user/get-user";

const main = async () => {
  config();

  const app = express();

  app.use(express.json()); // vai converter para json todas as nossas request

  await MongoClient.connect();

  app.get("/", (_req: Request, res: Response) => {
    res.status(200).send("O Docker está funcionando...");
  });

  app.get("/users", async (_req: Request, res: Response) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/createUser", async (req: Request, res: Response) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository,
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/updateUser/:id", async (req: Request, res: Response) => {
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

  app.delete("/deleteUser/:id", async (req: Request, res: Response) => {
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

  app.get("/user/:id", async (req: Request, res: Response) => {
    const mongoGetUserRepository = new MongoGetUserRepository();
    const getUserController = new GetUserController(mongoGetUserRepository);

    const { body, statusCode } = await getUserController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();

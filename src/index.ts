import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import { userRoutes } from "./routes/userRoutes";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());
  await MongoClient.connect();

  app.use("/users", userRoutes);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();

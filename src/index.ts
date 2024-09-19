import express, { Request, Response } from "express";
import { config } from "dotenv";
config();

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORD");
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

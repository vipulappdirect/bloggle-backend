import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

const port = process.env.SERVER_PORT;

app.get("/express", (req: Request, res: Response) =>
{
  console.log("Hello from Express!");
  return res.status(200).json({ message: "Hello from Express App!" });
});

app.get("/", (req: Request, res: Response) =>
{
  console.log("Hello from Home!");
  return res.status(200).json({ message: "Hello from Home App!" });
});

app.listen(port, () => {
  console.log(`Express Server Started`);
});

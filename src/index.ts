import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
const port = 5000;

app.get("/express", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Hello from Express!" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

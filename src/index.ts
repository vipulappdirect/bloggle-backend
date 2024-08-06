import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import {PrismaClient} from "@prisma/client";
dotenv.config();

const app = express();
app.use(cors());
const prisma = new PrismaClient();
const port = process.env.SERVER_PORT;

import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import feedRoutes from './routes/feedRoutes';
import authMiddleware from  './middleware/authMiddleware';
import testRoute from "./routes/testRoute";

app.use(express.json());

app.use('/api/home', testRoute(prisma));
app.use('/api/auth', authRoutes(prisma));
app.use('/api/feed', feedRoutes(prisma));
app.use('/api/posts', authMiddleware(prisma), postRoutes(prisma));

app.listen(port, () => {
  console.log(`Express Server Started ${port}`);
});

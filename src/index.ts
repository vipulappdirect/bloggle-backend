import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { PrismaClient } from "@prisma/client";

// Load environment variables from .env file
dotenv.config();

// Initialize Prisma Client
const prisma = new PrismaClient();

// Initialize Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load environment variables
const port = process.env.SERVER_PORT || 8080; // Provide a default port

// Import routes and middleware
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import feedRoutes from './routes/feedRoutes';
import authMiddleware from './middleware/authMiddleware';
import testRoute from "./routes/testRoute";

// Route Handlers
app.use('/api/home', testRoute(prisma));
app.use('/api/auth', authRoutes(prisma));
app.use('/api/feed', feedRoutes(prisma));
app.use('/api/posts', authMiddleware(prisma), postRoutes(prisma));

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Express Server started on port ${port}`);
});

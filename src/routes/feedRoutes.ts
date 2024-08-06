import { Router } from 'express';
import postController from '../controllers/postController';
import { PrismaClient } from '@prisma/client';

const feedRoutes = (prisma: PrismaClient) => {
    const router = Router();
    const controller = postController(prisma);

    router.get('/getAllPosts', controller.getAllPosts);

    return router;
};

export default feedRoutes;

import { Router } from 'express';
import postController from '../controllers/postController';
import { PrismaClient } from '@prisma/client';

const testRoutes = (prisma: PrismaClient) => {
    const router = Router();
    const controller = postController(prisma);

    router.get('/', controller.testApi);

    return router;
};

export default testRoutes;

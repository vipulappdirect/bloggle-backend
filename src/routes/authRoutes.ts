import { Router } from 'express';
import authController from '../controllers/authController';
import { PrismaClient } from '@prisma/client';

const authRoutes = (prisma: PrismaClient): Router => {
    const router = Router();
    const controller = authController(prisma);

    // Define routes with controller methods
    router.post('/signup', controller.signup);
    router.post('/login', controller.login);
    router.get('/verify-token', controller.verifyToken);

    return router;
};

export default authRoutes;

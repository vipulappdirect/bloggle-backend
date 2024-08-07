import { Router } from 'express';
import authController from '../controllers/authController';
import { PrismaClient } from '@prisma/client';

const authRoutes = (prisma: PrismaClient) => {
    const router = Router();
    const controller = authController(prisma);
    console.log('Private API request.')
    router.post('/signup', controller.signup);
    router.post('/login', controller.login);
    router.get('/verify-token', controller.verifyToken);

    return router;
};

export default authRoutes;

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {PrismaClient, User} from '@prisma/client';

const authMiddleware = (prisma: PrismaClient) => {
    return async (req: any, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(404).send('Access Denied.');
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
            const user: User = await prisma.user.findUnique({
                where: { id: decoded.userId }
            }) as User;
            req.user = user;
            if (!req.user) return res.status(401).send('Invalid Token.');
            next();
        } catch (error) {
            res.status(401).send('Invalid Token.');
        }
    };
};

export default authMiddleware;

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';

const authMiddleware = (prisma: PrismaClient) => {
    return async (req: Request | any, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(403).json({ message: 'Access Denied: No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

            const user:User = await prisma.user.findUnique({
                where: { email: decoded.userId }
            }) as User;

            if (!user) {
                return res.status(401).json({ message: 'Invalid Token: User not found.' });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error('JWT Verification Error:', error);
            return res.status(401).json({ message: 'Invalid Token: Authentication failed.' });
        }
    };
};

export default authMiddleware;

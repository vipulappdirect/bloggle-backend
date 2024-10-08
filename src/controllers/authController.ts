import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {PrismaClient, User} from '@prisma/client';

const authController = (prisma: PrismaClient) => {
    return {
        signup: async (req: Request, res: Response) => {
            const { email, password } = req.body;
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user: User = await prisma.user.create({
                    data: {
                        email,
                        passwordHash: hashedPassword
                    }
                }) as User;
                const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1hr' });
                return res.status(201).json({ token: token, username: user.email});
            } catch (error) {
                return res.status(500).send('User Already Exist, Please Log In.');
            }
        },

        login: async (req: Request, res: Response) => {
            const { email, password } = req.body;
            try {
                const user: User = await prisma.user.findUnique({ where: { email } }) as User;
                if (!user) return res.status(401).send('Invalid email or password.');

                const validPassword = await bcrypt.compare(password, user.passwordHash);
                if (!validPassword) return res.status(401).send('Invalid email or passwords.');

                const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1hr' });
                return res.json({ token: token, username: user.email });
            } catch (error) {
                return res.status(500).send('Error logging in.');
            }
        },

        verifyToken: async (req: Request, res: Response) => {
            const token : string = req.header('Authorization')?.replace('Bearer ', '') as string;
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
                if (!decoded) return res.status(401).send('Unauthorized: Invalid Token.');
                return res.status(200).json({ token: token, username: decoded.userId });
            } catch (error) {
                return res.status(401).send('Invalid Token.');
            }
        }
    };
};

export default authController;

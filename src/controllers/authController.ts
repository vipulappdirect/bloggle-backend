import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';

const authController = (prisma: PrismaClient) => ({
    signup: async (req: Request, res: Response): Promise<Response> => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user: User = await prisma.user.create({
                data: { email, passwordHash: hashedPassword }
            }) as User;

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );

            return res.status(201).json({ token, email: user.email });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'User Already Exists, Please Log In.' });
        }
    },

    login: async (req: Request, res: Response): Promise<Response> => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        try {
            const user: User | null = await prisma.user.findUnique({ where: { email } }) as User;

            if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

            const validPassword = await bcrypt.compare(password, user.passwordHash);
            if (!validPassword) return res.status(401).json({ message: 'Invalid email or password.' });

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );

            return res.json({ token, email: user.email });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error logging in.' });
        }
    },

    verifyToken: (req: Request, res: Response): Response => {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };

            if (!decoded) return res.status(401).json({ message: 'Unauthorized: Invalid Token.' });

            return res.status(200).json({ message: 'Token is valid.' });
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Invalid Token.' });
        }
    }
});

export default authController;

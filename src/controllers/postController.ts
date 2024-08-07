import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";

const postController = (prisma: PrismaClient) => ({
    createPost: async (req: Request, res: Response): Promise<Response> => {
        const { title, content, imageUrl, token } = req.body;

        if (!token) return res.status(401).json({ message: 'Not authorized.' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

            if (!decoded) return res.status(401).json({ message: 'Unauthorized: Invalid Token.' });

            const post = await prisma.post.create({
                data: { title, content, authorId: decoded.userId, imageURL: imageUrl },
            });

            return res.status(201).json(post);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating post.' });
        }
    },

    getAllPosts: async (_req: Request, res: Response): Promise<Response> => {
        try {
            const posts = await prisma.post.findMany();
            return res.json(posts);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error retrieving posts.' });
        }
    },

    getPostsByAuthor: async (req: Request, res: Response): Promise<Response> => {
        const { token } = req.body;

        if (!token) return res.status(401).json({ message: 'Not authorized.' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

            if (!decoded) return res.status(401).json({ message: 'Unauthorized: Invalid Token.' });

            const posts = await prisma.post.findMany({
                where: { authorId: decoded.userId },
            });

            return res.json(posts);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error retrieving posts.' });
        }
    },

    deletePostsByAuthor: async (req: Request, res: Response): Promise<Response> => {
        const { authorId } = req.params;

        if (!authorId || isNaN(Number(authorId))) {
            return res.status(400).json({ message: 'Invalid author ID.' });
        }

        try {
            const deletedPosts = await prisma.post.deleteMany({
                where: { authorId },
            });

            return res.json(deletedPosts);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting posts.' });
        }
    },

    getPostByPostId: async (req: Request, res: Response): Promise<Response> => {
        const { postId } = req.params;

        if (!postId || isNaN(Number(postId))) {
            return res.status(400).json({ message: 'Invalid post ID.' });
        }

        try {
            const post = await prisma.post.findUnique({
                where: { id: Number(postId) },
            });

            if (!post) return res.status(404).json({ message: 'Post not found.' });

            return res.json(post);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error retrieving post.' });
        }
    },

    testApi: (_req: Request, res: Response): Response => {
        return res.status(200).json({ message: 'Test API' });
    }
});

export default postController;

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";

const postController = (prisma: PrismaClient) => {
    return {
        createPost: async (req: Request, res: Response) => {
            const {authorId, title, content, imageUrl, token } = req.body;
            if (!authorId) return res.status(401).send('Not authorized.');
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
                if (!decoded) return res.status(401).send('Unauthorized: Invalid Token.');
                const post = await prisma.post.create({
                    data: { title, content, authorId: decoded.userId as unknown as string, imageURL: imageUrl },
                });
                res.status(201).json(post);
            } catch (error) {
                res.status(500).send('Error creating post.');
            }
        },

        getAllPosts: async (req: Request, res: Response) => {
            try {
                const posts = await prisma.post.findMany();
                res.json(posts);
            } catch (error) {
                res.status(500).send('Error retrieving posts.');
            }
        },

        getPostsByAuthor: async (req: Request, res: Response) => {
            const { token } = await req.body;
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
            if (!decoded) return res.status(401).send('Unauthorized: Invalid Token.');
            const author = decoded.userId;
            if (!author) return res.status(400).send('Invalid author ID.');
            try {
                const posts = await prisma.post.findMany({
                    where: { authorId: author as unknown as string },
                });
                return res.json(posts);
            } catch (error) {
                res.status(500).send('Error retrieving posts.');
            }
        },

        deletePostsByAuthor: async (req: Request, res: Response) => {
            const { authorId } = req.params;
            if (!authorId || isNaN(Number(authorId))) return res.status(400).send('Invalid author ID.');
            try {
                const posts = await prisma.post.deleteMany({
                    where: { id: Number(authorId) },
                });
                return res.json(posts);
            } catch (error) {
                res.status(500).send('Error deleting posts.');
            }
        },

        testApi: (req: Request, res: Response) => {
            return res.status(200).json({ message: 'Test API' });
        },

        getPostByPostId: async (req: Request, res: Response) => {
            const { postId } = req.params;
            if (!postId || isNaN(Number(postId))) return res.status(400).send('Invalid post ID.');
            try {
                const post = await prisma.post.findUnique({
                    where: { id: Number(postId) }
                });
                return res.json(post);
            } catch (error) {
                res.status(500).send('Error retrieving post.');
            }
        }
    };
};

export default postController;

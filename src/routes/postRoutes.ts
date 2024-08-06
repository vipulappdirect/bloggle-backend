import { Router } from 'express';
import postController from '../controllers/postController';
import { PrismaClient } from '@prisma/client';

const postRoutes = (prisma: PrismaClient) => {
    const router = Router();
    const controller = postController(prisma);

    router.post('/createPost', controller.createPost);
    router.post('/getAuthorPosts', controller.getPostsByAuthor);
    router.delete('/deletePost/:authorId', controller.deletePostsByAuthor);

    return router;
};

export default postRoutes;

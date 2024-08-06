// src/types/express.d.ts
import { User } from '@prisma/client';

declare global {
    namespace Express {
        interface Request {
            user?: User; // Extend the Request interface to include the user property
        }
    }
}

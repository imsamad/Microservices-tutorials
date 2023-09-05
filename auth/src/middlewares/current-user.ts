import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Augment Request Parameter Interface
interface UserPayload {
   id: string;
   email: string;
}

declare global {
   namespace Express {
      interface Request {
         currentUser?: UserPayload;
      }
   }
}

export const currentUser = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   if (!req.session?.jwt) return next();

   try {
      const payload = jwt.verify(req.session.jwt, 'xyz') as UserPayload;
      req.currentUser = payload;
   } catch (_) {}

   next();
};

import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, BadRequestError } from '@xyz-common/common';
import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
   '/api/users/signin',
   [
      body('email').isEmail().withMessage('Email must be valid'),
      body('password').trim().notEmpty().withMessage('Password is required'),
   ],
   validateRequest,
   async (req: Request, res: Response) => {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      const pwdMatch =
         user && (await Password.compare(user.password, password));

      if (!user || !pwdMatch) {
         throw new BadRequestError('Invalid credentials');
      }

      const userJwt = jwt.sign(
         {
            id: user._id,
            email: user.email,
         },
         process.env.JWT_KEY!
      );

      req.session = { jwt: userJwt };
      return res.status(201).send(user);
   }
);

export { router as signinRouter };

import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
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
         'xyz'
      );

      req.session = { jwt: userJwt };
      return res.status(201).send(user);
   }
);

export { router as signinRouter };

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

import cookieSession from 'cookie-session';

const app = express();

const corsOption = {
   origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
   credentials: true,
   exposedHeaders: ['set-cookie'],
};

app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(express.json());
app.set('trust proxy', true);

app.use(
   cookieSession({
      secure: false,
      signed: false,
   })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
   throw new NotFoundError();
});

app.use(errorHandler);

export { app };

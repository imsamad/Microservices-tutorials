import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';

import { currentUser, errorHandler, NotFoundError } from '@xyz-common/common';

import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/createTicket';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

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

app.use(currentUser);

app.use(createTicketRouter);

app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res) => {
   throw new NotFoundError();
});

app.use(errorHandler);

export { app };

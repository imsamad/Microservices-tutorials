import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@xyz-common/common';
import { Ticket } from '../models/ticket';
import { TicketCreatePublisher } from '../events/publisher/TicketCreate';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
   '/api/tickets',
   requireAuth,
   [
      body('title').not().isEmpty().withMessage('Title is required'),
      body('price')
         .isFloat({ gt: 0 })
         .withMessage('Price must be greater than 0'),
   ],
   validateRequest,
   async (req: Request, res: Response) => {
      const { title, price } = req.body;

      let ticket = Ticket.build({ title, price, userId: req.currentUser!.id });
      ticket = await ticket.save();

      await new TicketCreatePublisher(natsWrapper.client).publish({
         id: ticket._id.toString(),
         title: ticket.title,
         userId: ticket.userId,
         price: ticket.price,
      });

      res.status(201).send(ticket);
   }
);

export { router as createTicketRouter };

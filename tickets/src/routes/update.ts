import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
   validateRequest,
   NotFoundError,
   requireAuth,
   NotAuthorisedError,
} from '@xyz-common/common';
import { Ticket } from '../models/ticket';
import { TicketUpdatePublisher } from '../events/publisher/TicketUpdate';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
   '/api/tickets/:id',
   requireAuth,
   [
      body('title').not().isEmpty().withMessage('Title is required'),
      body('price')
         .isFloat({ gt: 0 })
         .withMessage('Price must be provided and must be greater than 0'),
   ],
   validateRequest,
   async (req: Request, res: Response) => {
      const ticket = await Ticket.findById(req.params.id);

      if (!ticket) {
         throw new NotFoundError();
      }

      if (ticket.userId !== req.currentUser!.id) {
         throw new NotAuthorisedError();
      }

      ticket.set({
         title: req.body.title,
         price: req.body.price,
      });
      //  @ts-ignore
      await ticket.save();

      await new TicketUpdatePublisher(natsWrapper.client).publish({
         title: ticket.title,
         id: ticket._id,
         userId: ticket.userId,
         price: ticket.price,
      });
      res.send(ticket);
   }
);

export { router as updateTicketRouter };

import { BaseListner, Subjects, TicketCreatedEvent } from '@xyz-common/common';
import { Message } from 'node-nats-streaming';

export class TicketCreatedListener extends BaseListner<TicketCreatedEvent> {
   readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
   readonly queueGroupName = 'payments-service';

   onMessage(data: TicketCreatedEvent['data'], msg: Message) {
      console.log(data.id);
      console.log(data.price);
      console.log(data.title);

      msg.ack();
   }
}

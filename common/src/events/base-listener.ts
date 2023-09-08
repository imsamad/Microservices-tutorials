import { Message, Stan } from 'node-nats-streaming';

import { Event } from './IEvent';

abstract class BaseListner<T extends Event> {
   private client: Stan;
   abstract subject: T['subject'];
   abstract queueGroupName: string;

   protected ackWait = 5 * 1000;

   constructor(client: Stan) {
      this.client = client;
   }

   abstract onMessage(data: T['data'], msg: Message): void;

   subscriptionOptions() {
      return this.client
         .subscriptionOptions()
         .setManualAckMode(true)
         .setDeliverAllAvailable()
         .setDurableName(this.queueGroupName)
         .setAckWait(this.ackWait);
   }

   listen() {
      const subscription = this.client.subscribe(
         this.subject,
         this.queueGroupName,
         this.subscriptionOptions()
      );

      subscription.on('message', (msg: Message) => {
         const data: T['data'] = this.parseMessage(msg);

         this.onMessage(data, msg);
      });
   }

   parseMessage(msg: Message) {
      const data = msg.getData();

      return JSON.parse(typeof data == 'string' ? data : data.toString('utf8'));
   }
}

export { BaseListner };

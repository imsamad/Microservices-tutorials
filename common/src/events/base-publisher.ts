import { Stan } from 'node-nats-streaming';
import { Event } from './IEvent';

export abstract class BasePublisher<T extends Event> {
   private client: Stan;
   abstract subject: Event['subject'];

   constructor(client: Stan) {
      this.client = client;
   }

   publish(data: T['data']): Promise<void> {
      return new Promise((resolve, reject) => {
         this.client.publish(this.subject, JSON.stringify(data), (err) => {
            if (err) {
               reject(err);
            }
         });
         resolve();
      });
   }
}

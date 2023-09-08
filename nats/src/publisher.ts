import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from '../events/TicketCreatedPublisher';
console.clear();

const client = nats.connect('ticketing', 'abc', {
   url: 'http://localhost:4222',
});

client.on('connect', () => {
   console.log('Published connected to NATS!');
   const data = JSON.stringify({
      id: 123,
      title: 'concert',
      price: 199,
   });

   const ticketCreatedPublisher = new TicketCreatedPublisher(client);

   try {
      ticketCreatedPublisher.publish({
         id: '123',
         title: `${Date.now().toLocaleString()}`,
         price: 9000,
      });
   } catch (err) {}
});

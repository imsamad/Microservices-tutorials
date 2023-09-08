import nats, { Message } from 'node-nats-streaming';
import { TicketCreatedListener } from '../events/TicketCreatedListner';
console.clear();

const clientId = `client-${Math.random().toString(36).substring(7)}`;
const client = nats.connect('ticketing', clientId, {
   url: 'http://localhost:4222',
});

client.on('connect', () => {
   client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
   });
   console.log('NATS connectio!');

   new TicketCreatedListener(client).listen();
});

process.on('SIGINT', () => client.close());
process.on('SIGTERM', () => client.close());

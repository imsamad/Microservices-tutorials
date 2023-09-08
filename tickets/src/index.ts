require('dotenv').config({});
import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
   if (!process.env.JWT_KEY || !process.env.MONGO_URI)
      throw Error('ENV insufficient');

   try {
      await natsWrapper.connect('ticketing', 'abc', 'http://localhost:4222');
      natsWrapper.client.on('close', () => {
         console.log(`NATS connection closed!`);
         process.exit();
      });

      process.on('SIGINT', () => natsWrapper.client.close());
      process.on('SIGTERM', () => natsWrapper.client.close());

      console.log('Connected to NATS');
      const domain = !true ? 'auth-mongo-srv' : '127.0.0.1';
      const mongoUri = process.env.MONGO_URI!;
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDb');
   } catch (err) {
      console.error(err);
   }
   // console.log('object', process.env.JWT_SECRET);
   app.listen(4000, () => {
      console.log('Listening on port 4000!!!!!!!!');
   });
};

start();

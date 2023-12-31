import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
   if (!process.env.JWT_SECRET || !process.env.MONGO_URI)
      throw Error('ENV insufficient');
   try {
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

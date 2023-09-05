import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
   try {
      //
      const domain = !true ? 'auth-mongo-srv' : '127.0.0.1';
      await mongoose.connect(`mongodb://${domain}:27017/auth`);
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

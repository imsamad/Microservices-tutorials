import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

let mongo: any;

declare global {
   var signin: () => Promise<string[]>;
}

beforeAll(async () => {
   process.env.JWT_KEY = 'xyz';
   mongo = await MongoMemoryServer.create();
   const mongoUri = mongo.getUri();
   await mongoose.connect(mongoUri);
});

beforeEach(async () => {
   const collections = await mongoose.connection.db.collections();
   const deleteCollsPromise = collections.map((coll) => coll.deleteMany({}));
   await Promise.allSettled(deleteCollsPromise);
});

afterAll(async () => {
   await mongo?.stop?.();
   await mongoose.connection.close();
});

global.signin = async () => {
   const user = {
      email: 'test@test.com',
      password: 'password',
   };

   const response = await request(app)
      .post('/api/users/signup')
      .send(user)
      .expect(201);

   const cookie = response.get('Set-Cookie');
   return cookie;
};

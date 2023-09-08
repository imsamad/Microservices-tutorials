import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

jest.mock('../nats-wrapper');

let mongo: any;

declare global {
   var signin: () => string;
}

beforeAll(async () => {
   process.env.JWT_KEY = 'xyz';
   mongo = await MongoMemoryServer.create();
   const mongoUri = mongo.getUri();
   await mongoose.connect(mongoUri);
});

beforeEach(async () => {
   jest.clearAllMocks();
   const collections = await mongoose.connection.db.collections();
   const deleteCollsPromise = collections.map((coll) => coll.deleteMany({}));
   await Promise.allSettled(deleteCollsPromise);
});

afterAll(async () => {
   await mongo?.stop?.();
   await mongoose.connection.close();
});

global.signin = () => {
   const user = {
      email: 'one@gmail.com',
      id: '64f86bfb742bf5b015ab1087',
   };
   const jsonPayload = jwt.sign(user, process.env.JWT_KEY!);
   const session = { jwt: jsonPayload };
   const sessionJson = JSON.stringify(session);
   const base64 = Buffer.from(sessionJson).toString('base64');
   // return 'session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkwWmpnMlltWmlOelF5WW1ZMVlqQXhOV0ZpTVRBNE55SXNJbVZ0WVdsc0lqb2liMjVsUUdkdFlXbHNMbU52YlNJc0ltbGhkQ0k2TVRZNU5EQXdOekF5TVgwLmN5MHZTT01sbzI3cGFJZVZKNzgyU19nSDFSWUJhMGJaZG9yQUhWT0JQUHMifQ==';
   return `session=${base64}`;
};

import request from 'supertest';
import { app } from '../../app';

const reqRef = request(app);

it('Returns 201 on successful signin and have cookie in response header', async () => {
   const user = {
      email: 'test@test.com',
      password: 'password',
   };
   await reqRef.post('/api/users/signup').send(user).expect(201);
   const response = await reqRef
      .post('/api/users/signin')
      .send(user)
      .expect(201);
   expect(response.get('Set-Cookie')).toBeDefined();
});

it('Returns 400 incorrect credential', async () => {
   const user = {
      email: 'test@test.com',
      password: 'password',
   };
   const user1 = {
      email: 'test1@test.com',
      password: 'password',
   };
   await reqRef.post('/api/users/signup').send(user).expect(201);
   await reqRef.post('/api/users/signin').send(user1).expect(400);
});

it('Returns 400 on signing in with email that does not exist', () => {
   return reqRef
      .post('/api/users/signin')
      .send({
         email: 'test@test.com',
         password: 'password',
      })
      .expect(400);
});

// request fake a request to the application
import request from 'supertest';
import { app } from '../../app';

const reqRef = request(app);

it('Returns 201 on successful signup and have cookie in response header', async () => {
   const response = await reqRef
      .post('/api/users/signup')
      .send({
         email: 'test@test.com',
         password: 'password',
      })
      .expect(201);
   expect(response.get('Set-Cookie')).toBeDefined();
});

it('Returns 400 with an invalid email', () => {
   return reqRef
      .post('/api/users/signup')
      .send({
         email: 'testtest.com',
         password: 'password',
      })
      .expect(400);
});

it('Returns 400 with an invalid password [less then 4 chars]', () => {
   return reqRef
      .post('/api/users/signup')
      .send({
         email: 'test@test.com',
         password: 'pas',
      })
      .expect(400);
});

it('Returns 400 with email and password missing', () => {
   return reqRef.post('/api/users/signup').send({}).expect(400);
});

it('Diallow duplicate emails', async () => {
   let email = 'test@test.com';
   await reqRef
      .post('/api/users/signup')
      .send({
         email,
         password: 'password',
      })
      .expect(201);

   await reqRef
      .post('/api/users/signup')
      .send({
         email,
         password: 'password',
      })
      .expect(400);
});

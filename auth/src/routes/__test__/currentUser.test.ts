import request from 'supertest';
import { app } from '../../app';

const reqRef = request(app);

it('Respond with details about current user', async () => {
   const cookies = await global.signin();
   const response = await reqRef
      .get('/api/users/currentuser')
      .set('Cookie', cookies[0])
      .send({})
      .expect(201);

   expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('Respond with 400 if not signed in', async () => {
   const response = await reqRef
      .get('/api/users/currentuser')
      .send({})
      .expect(401);
});

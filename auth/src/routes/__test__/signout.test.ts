import request from 'supertest';
import { app } from '../../app';

const reqRef = request(app);

it('Clear the cookies after signing out', async () => {
   const user = {
      email: 'test@test.com',
      password: 'password',
   };
   await reqRef.post('/api/users/signup').send(user).expect(201);
   const response = await reqRef
      .post('/api/users/signout')
      .send({})
      .expect(200);

   expect(response.get('Set-Cookie')[0]).toEqual(
      'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
   );
});

import React, { useState } from 'react';
import { useRouter } from 'next/router';

import useRequest from '../../hooks/useRequest';

const Signup = () => {
   const [user, setUser] = useState({
      email: 'xyz@gmail.com',
      password: '1111',
   });
   const router = useRouter();
   const handleChange = (e) => {
      setUser((pre) => ({ ...pre, [e.target.name]: e.target.value }));
   };

   const { doRequest, errors } = useRequest({
      method: 'post',
      url: 'http://localhost:4000/api/users/signup',
      body: user,
   });

   const handleSubmit = async (e) => {
      e.preventDefault();
      await doRequest(() => {
         router.push('/');
      });
   };

   return (
      <form onSubmit={handleSubmit}>
         <h1>Sign Up</h1>
         <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
               type='text'
               id='email'
               name='email'
               className='form-control'
               onChange={handleChange}
               value={user.email}
            />
         </div>
         <div className='form-group'>
            <label htmlFor='email'>Password</label>
            <input
               type='password'
               id='password'
               name='password'
               className='form-control'
               onChange={handleChange}
               value={user.password}
            />
         </div>
         {errors}
         <button type='submit' className='btn btn-primary'>
            Submit
         </button>
      </form>
   );
};

export default Signup;

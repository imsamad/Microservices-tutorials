import axios from 'axios';
import React, { useState } from 'react';

const useRequest = ({ method, url, body }) => {
   const [errors, setErrors] = useState(null);
   const doRequest = async (onSuccess) => {
      try {
         const response = await axios[method](url, body, {
            withCredentials: true,
         });
         onSuccess && onSuccess(response.data);
      } catch (err) {
         setErrors(
            <div className='alert alert-danger'>
               <h4>Ooops... </h4>
               <ul className='my-0'>
                  {err?.response?.data?.errors.map((err) => (
                     <li key={err.message}>{err.message}</li>
                  ))}
               </ul>
            </div>
         );
      }
   };

   return { doRequest, errors };
};

export default useRequest;

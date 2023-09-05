import axios from 'axios';

export const buildClient = ({ req }) => {
   const uri =
      typeof window == 'undefined'
         ? `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local`
         : 'http://localhost:4000';

   const axiosObj = {
      baseURL: 'http://localhost:4000',
   };

   if (typeof window == 'undefined') axiosObj.headers = req.headers;

   return axios.create(axiosObj);
};

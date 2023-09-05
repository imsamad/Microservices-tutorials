import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/header';
import { buildClient } from '../api/build-client';

const AppComponent = ({ Component, pageProps, currentUser }) => {
   return (
      <div>
         <Header currentUser={currentUser} />
         <Component {...pageProps} />
      </div>
   );
};

AppComponent.getInitialProps = async (appContext) => {
   const client = buildClient(appContext.ctx);
   let data = {};
   try {
      const { data: tmp } = await client.get('/api/users/currentuser');
      data = tmp;
   } catch (err) {}

   let pageProps = {};
   if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
   }

   return {
      pageProps,
      ...data,
   };
};

export default AppComponent;

import { useAuth0 } from '@auth0/auth0-react';
import Header from '../components/Header';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Header />
      <h4 className='mt-1 text-2xl tracking-wide text-gr-100'>
        Manage Your Task Checklist Easily
      </h4>
      <button
        className='px-8 py-4 text-2xl font-semibold tracking-wide text-white outline-none bg-purp-100 mt-14 rounded-2xl'
        onClick={() => loginWithRedirect()}
      >
        Lets Start
      </button>
    </div>
  );
};

export default LoginPage;

import { useAuth0 } from '@auth0/auth0-react';
import Header from '../components/Header';
import Todos from '../components/Todos';

const TodoPage = () => {
  const { logout, user, isAuthenticated } =
    useAuth0();

  return (
    <div className='h-screen px-4 pt-10 lg:px-24'>
      <Header />
      <div className='flex items-center justify-between mt-10'>
        {isAuthenticated && (
          <div className='flex flex-col items-center justify-center md:flex-row '>
            <div>
              <img
                className='w-24 h-24 rounded-full'
                src={user?.picture}
                alt={user?.nickname}
              />
            </div>
            <div className='ml-4 text-gr-100'>
              <h2 className='text-3xl tracking-wide'>
                Hi,
                <span className='text-2xl'>
                  {user?.nickname}
                </span>
                👋🏽
              </h2>
            </div>
          </div>
        )}
        <div>
          <button
            className='px-8 py-4 text-2xl tracking-wide text-white bg-purp-100 rounded-2xl'
            onClick={() =>
              logout({
                returnTo: window.location.origin,
              })
            }
          >
            LogOut
          </button>
        </div>
      </div>
      <Todos />
    </div>
  );
};

export default TodoPage;

import { Suspense } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import TodoPage from './Pages/TodoPage';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Suspense
        fallback={
          <div className='tracking-widest text-green-600'>
            Loading...
          </div>
        }
      >
        <BrowserRouter>
          <Switch>
            <Route path={['/', '/login']} exact>
              {isAuthenticated ? (
                <Redirect to='/todo' />
              ) : (
                <LoginPage />
              )}
            </Route>
            <Route path={'/todo'} exact>
              {isAuthenticated ? (
                <TodoPage />
              ) : (
                <Redirect to='/login' />
              )}
            </Route>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </>
  );
};

export default App;

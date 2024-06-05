import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const AuthLogin = Loadable(lazy(() => import('pages/auth/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/register',
      element: <AuthRegister />
    }
  ]
};

export default AuthenticationRoutes;

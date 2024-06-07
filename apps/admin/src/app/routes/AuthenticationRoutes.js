import { lazy } from 'react';
import Loadable from 'app/ui-component/Loadable';

const AuthLogin = Loadable(lazy(() => import('app/pages/auth/Login')));
const AuthRegister = Loadable(lazy(() => import('app/pages/auth/Register')));

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

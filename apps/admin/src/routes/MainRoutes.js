import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const TaskDefault = Loadable(lazy(() => import('pages/tasks/tasks')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <TaskDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <TaskDefault />
        }
      ]
    },
  ]
};

export default MainRoutes;

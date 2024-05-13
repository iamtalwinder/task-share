import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const TaskDefault = Loadable(lazy(() => import('pages/tasks/tasks')));
const AddTaskDefault = Loadable(lazy(() => import('pages/add-task/AddTask')));
const ViewTask = Loadable(lazy(() => import('pages/view-task/ViewTask')));

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
    {
      path: '/task/add',
      element: <AddTaskDefault />
    },
    {
      path: '/task/:id/edit',
      element: <AddTaskDefault />
    },
    {
      path: '/task/view',
      element: <ViewTask />
    }
  ]
};

export default MainRoutes;

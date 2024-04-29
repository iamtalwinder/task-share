import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const TaskDefault = Loadable(lazy(() => import('pages/tasks/Tasks')));
const AddTaskDefault = Loadable(lazy(() => import('pages/add-task/AddTask')));

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
      path: 'add-task',
      element: <AddTaskDefault />
    }
  ]
};

export default MainRoutes;

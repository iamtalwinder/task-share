import { lazy } from 'react';
import MainLayout from 'app/layout/MainLayout';
import Loadable from 'app/ui-component/Loadable';

const TaskDefault = Loadable(lazy(() => import('app/pages/tasks/tasks')));
const AddTaskDefault = Loadable(lazy(() => import('app/pages/add-task/AddTask')));
const ViewTask = Loadable(lazy(() => import('app/pages/view-task/ViewTask')));
const TestList = Loadable(lazy(() => import('app/pages/tests/TestsList')));
const AddTest = Loadable(lazy(() => import('app/pages/add-test/AddTest')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/tasks',
      default: true,
      element: <TaskDefault />
    },
    // {
    //   path: 'dashboard',
    //   children: [
    //     {
    //       path: 'default',
    //       element: <TaskDefault />
    //     }
    //   ]
    // },
    {
      path: '/task/add',
      element: <AddTaskDefault />
    },
    {
      path: '/task/:id/edit',
      element: <AddTaskDefault />
    },
    {
      path: '/task/:id/view',
      element: <ViewTask />
    },
    {
      path: '/tests',
      element: <TestList />
    },
    {
      path: '/test/add',
      element: <AddTest />
    },
    {
      path: '/test/:id/edit',
      element: <AddTest />
    }
  ]
};

export default MainRoutes;

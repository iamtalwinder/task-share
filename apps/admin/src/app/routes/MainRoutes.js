import { lazy } from 'react';
import MainLayout from 'app/layout/MainLayout';
import Loadable from 'app/ui-component/Loadable';

const TaskDefault = Loadable(lazy(() => import('app/modules/task/pages/list')));
const AddTask = Loadable(lazy(() => import('app/modules/task/pages/add')));
const ViewTask = Loadable(lazy(() => import('app/modules/view-task/ViewTask')));
const TestList = Loadable(lazy(() => import('app/modules/tests/TestsList')));
const AddTest = Loadable(lazy(() => import('app/modules/add-test/AddTest')));
const EditTask = Loadable(lazy(() => import('app/modules/task/pages/update')));

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
      element: <AddTask />
    },
    {
      path: '/task/:taskId/edit',
      element: <EditTask />
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

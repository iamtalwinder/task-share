import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const TaskDefault = Loadable(lazy(() => import('pages/tasks/tasks')));
const AddTaskDefault = Loadable(lazy(() => import('pages/add-task/AddTask')));
const ViewTask = Loadable(lazy(() => import('pages/view-task/ViewTask')));
const TestList = Loadable(lazy(() => import('pages/tests/TestsList')));
const AddTest = Loadable(lazy(() => import('pages/add-test/AddTest')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
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
      path: '/task/view',
      element: <ViewTask />
    },
    {
      path: '/tests',
      element: <TestList />
    },
    {
      path: '/test/add',
      element: <AddTest/>
    }
  ]
};

export default MainRoutes;

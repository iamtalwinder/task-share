// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const tasks = {
  id: 'tasks',
  type: 'group',
  children: [
    {
      id: 'tasks',
      title: 'Tasks',
      type: 'item',
      url: '/tasks',
      breadcrumbs: false,
    },
    {
      id: 'tests',
      title: 'Tests',
      type: 'item',
      url: '/tests',
      breadcrumbs: false,
    },
  ],
};

export default tasks;

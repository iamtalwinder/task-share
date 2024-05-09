
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const tasks = {
  id: 'tasks',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Tasks',
      type: 'item',
      url: '/',
      breadcrumbs: false
    },
    {
      id: 'tests',
      title: 'Tests',
      type: 'item',
      url: '/tests',
      breadcrumbs: false
    },
    {
      id: 'link',
      title: 'Generated URL',
      type: 'item',
      url: '/generated-url',
      breadcrumbs: false
    }
  ]
}

export default tasks;

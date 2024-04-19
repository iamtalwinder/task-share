import { IconDashboard } from '@tabler/icons-react';

const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;

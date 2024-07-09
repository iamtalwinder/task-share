export const tests = [
  {
    id: 1,
    title: 'todo-test',
    tasks: [{ taskId: 1, name: 'create todo-list' }, { taskId: 2, name: 'create mui snackbar' }],
    userId: 1
  },
  {
    id: 2,
    title: 'notification-test',
    tasks: [{ taskId: 1, name: 'create todo-list'}, {taskId: 4, name: 'create admin panel' }],
    userId: 1
  },
  {
    id: 3,
    title: 'register-test',
    tasks: [{ taskId: 5, name: 'register form using redux'}, {taskId: 6, name: 'register form using redux-toolkit' }],
    userId: 2
  },
  {
    id: 4,
    title: 'dashboard-screen-test',
    tasks: [{ taskId: 4, name: 'create admin panel' }, { taskId: 7, name: 'dashboard screen with list' }],
    userId: 2
  },
]
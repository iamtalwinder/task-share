import { createServer, Model } from 'miragejs';
import { users } from '../data/users';
import { tasks } from '../data/tasks';

import { authRoutes } from './auth';
import { userRoutes } from './user';
import { taskRoutes } from './task';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      task: Model
    },

    seeds(server) {
      users.forEach((user) => {
        server.create('user', user);
      });

      tasks.forEach((task) => {
        server.create('task', task);
      });
    },

    routes() {
      this.namespace = 'api';

      authRoutes.call(this);
      userRoutes.call(this);
      taskRoutes.call(this);
    }
  });

  return server;
}

makeServer();

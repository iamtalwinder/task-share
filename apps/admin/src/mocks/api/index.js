import { createServer, Model } from 'miragejs';
import { users, userTasks, tests } from '../data';

import { authRoutes } from './auth';
import { userRoutes } from './user';
import { taskRoutes } from './task';
import { testRoutes } from './test';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      task: Model,
      test: Model
    },

    seeds(server) {
      users.forEach((user) => {
        server.create('user', user);
      });

      userTasks.forEach((task) => {
        server.create('task', task);
      });

      tests.forEach((test) => {
        server.create('test', test);
      })
    },

    routes() {
      this.namespace = 'api';

      authRoutes.call(this);
      userRoutes.call(this);
      taskRoutes.call(this);
      testRoutes.call(this);
    }
  });

  return server;
}

makeServer();

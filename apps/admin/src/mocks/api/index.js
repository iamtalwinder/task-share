import { createServer, Model, belongsTo } from 'miragejs';
import { users } from '../data/users';
import { authRoutes } from './auth';
import { userRoutes } from './user';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      task: Model.extend({
        userId: belongsTo('user'),
      }),
    },

    seeds(server) {
      users.forEach((user) => {
        server.create('user', user);
      });
    },

    routes() {
      this.namespace = 'api';

      authRoutes.call(this);
      userRoutes.call(this);
    },
  });

  return server;
}

makeServer();

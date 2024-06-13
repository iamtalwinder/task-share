import { Response } from 'miragejs';
import { JwtService } from '../service/jwt.service';

export function taskRoutes() {
  this.get('/tasks', function (schema, request) {
    const payload = JwtService.validateRequest(request);
    if (!payload) {

      return new Response(401, {}, {
        errors: {
          type: 'unauthorized',
          message: 'Invalid token'
        }
      });
    }

    return schema.tasks.where({ userId: payload.userId });
  });
}

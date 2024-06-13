import { Response } from 'miragejs';
import { JwtService } from '../service/jwt.service';

export function userRoutes() {
  this.get('/user-profile', function (schema, request) {
    const payload = JwtService.validateRequest(request);
    if (!payload) {

      return new Response(401, {}, {
        errors: {
          type: 'unauthorized',
          message: 'Invalid token'
        }
      });
    }

    return schema.users.findBy({ id: payload.userId });
  });
}

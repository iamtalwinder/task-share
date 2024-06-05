import { Response } from 'miragejs';
import { JwtService } from '../service/jwt.service';

export const userRoutes = function (schema, request) {
  this.get('/user-profile', () => {
    0;
    const payload = JwtService.decodeToken(request);
    if (!payload) {
      errors.push({
        type: 'unauthorized',
        message: 'Invalid token'
      });

      return new Response(401, {}, { errors });
    }

    return schema.user.findBy({ id: payload.userId });
  });
};

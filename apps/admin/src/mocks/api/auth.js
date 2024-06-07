import { Response } from 'miragejs';
import { JwtService } from '../service/jwt.service';

export function authRoutes() {
  this.post('/login', function (schema, request) {
    console.log(schema);
    const attrs = JSON.parse(request.requestBody);
    const user = schema.users.findBy({
      email: attrs.email,
      password: attrs.password
    });

    const errors = [];

    if (!user) {
      errors.push({
        type: 'invalid_credentials',
        message: 'Invalid credentials, check your email & password'
      });
    }

    if (errors.length === 0) {
      return {
        user,
        ...JwtService.generateTokens(user)
      };
    }

    return new Response(401, {}, { errors });
  });

  this.post('/register', function (schema, request) {
    const attrs = JSON.parse(request.requestBody);
    const user = schema.users.create({ id: Date.now(), ...attrs });

    return { user, ...JwtService.generateTokens(user) };
  });

  this.post('/refresh-token', function (schema, request) {
    const payload = JwtService.decodeToken(request);
    if (!payload) {
      errors.push({
        type: 'unauthorized',
        message: 'Invalid token'
      });

      return new Response(401, {}, { errors });
    }

    const user = schema.users.findBy({ id: payload.userId });

    return JwtService.generateTokens(user);
  });
}

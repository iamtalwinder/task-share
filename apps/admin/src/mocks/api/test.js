import { Response } from 'miragejs';
import { JwtService } from '../service/jwt.service';

export function testRoutes() {
  this.get('/tests', function (schema, request) {
    const payload = JwtService.validateRequest(request);
    if (!payload) {
      return new Response(
        401,
        {},
        {
          errors: {
            type: 'unauthorized',
            message: 'Invalid token'
          }
        }
      );
    }

    return schema.tests.where({ userId: payload.userId });
  });

  this.post('/test', function (schema, request) {
    const payload = JwtService.validateRequest(request);
    if (!payload) {
      return new Response(
        401,
        {},
        {
          errors: {
            type: 'unauthorized',
            message: 'Invalid token'
          }
        }
      );
    }

    const testData = {
      ...JSON.parse(request.requestBody),
      userId: payload.userId,
    };
    const newTest = schema.tests.create(testData);
    console.log('new-test', newTest);

    return new Response(201, {}, newTest);
  });
}
import { Response } from 'miragejs';
import { JwtService } from '../service/jwt.service';

export function taskRoutes() {
  this.get('/tasks', function (schema, request) {
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

    return schema.tasks.where({ userId: payload.userId });
  });

  this.post('/task', function (schema, request) {
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

    const taskData = {
      ...JSON.parse(request.requestBody),
      userId: payload.userId,
      status: 'not-used'
    };
    const newTask = schema.tasks.create(taskData);

    return new Response(201, {}, newTask);
  });

  this.get('/task/:id', function (schema, request) {
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

    const id = request.params.id;
    return schema.tasks.find(id);
  });

  this.put('/task/:id', function (schema, request) {
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

    const id = request.params.id;
    return schema.tasks.find(id).update(JSON.parse(request.requestBody));
  });

  this.delete('/task/:id', function (schema, request) {
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
  
    const id = request.params.id;
    const task = schema.tasks.find(id);
  
    if (!task) {
      return new Response(
        404,
        {},
        {
          errors: {
            type: 'not-found',
            message: `Task with ID ${id} not found`
          }
        }
      );
    }
  
    task.destroy();
  
    return new Response(
      200,
      {},
      {
        message: `Task with ID ${id} has been deleted successfully`
      }
    );
  });
  
}

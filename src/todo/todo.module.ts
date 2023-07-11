import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TaskToDoController } from './todo.controller';
import { TaskToDoService } from './todo.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [TaskToDoController],
  providers: [TaskToDoService],
})
export class TaskToDoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/todo/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/todo/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/todo/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

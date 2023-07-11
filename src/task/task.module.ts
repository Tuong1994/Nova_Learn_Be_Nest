import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProjectTaskController } from './task.controller';
import { ProjectTaskService } from './task.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [ProjectTaskController],
  providers: [ProjectTaskService],
})
export class ProjectTaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/task/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/task/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/task/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

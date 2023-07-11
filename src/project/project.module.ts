import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CourseProjectController } from './project.controller';
import { CourseProjectService } from './project.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [CourseProjectController],
  providers: [CourseProjectService],
})
export class CourseProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/project/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/project/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/project/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

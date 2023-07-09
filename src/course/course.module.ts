import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/course/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/course/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/course/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

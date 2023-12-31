import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CourseOutputController } from './output.controller';
import { CourseOutputService } from './output.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [CourseOutputController],
  providers: [CourseOutputService],
})
export class CourseOutputModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/output/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/output/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/output/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

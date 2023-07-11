import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CourseTopicService } from './topic.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';
import { CourseTopicController } from './topic.controller';

@Module({
  controllers: [CourseTopicController],
  providers: [CourseTopicService],
})
export class CourseTopicModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/topic/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/topic/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/topic/rmeove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

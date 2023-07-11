import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CourseDurationController } from './duration.controller';
import { CourseDurationService } from './duration.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [CourseDurationController],
  providers: [CourseDurationService],
})
export class CourseDurationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/duration/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/duration/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/duration/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/rate/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/rate/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/rate/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { WardController } from './ward.controller';
import { WardService } from './ward.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [WardController],
  providers: [WardService],
})
export class WardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/ward/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/ward/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/ward/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

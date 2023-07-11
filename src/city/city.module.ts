import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/city/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/city/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/city/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

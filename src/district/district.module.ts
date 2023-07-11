import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/district/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/district/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/district/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

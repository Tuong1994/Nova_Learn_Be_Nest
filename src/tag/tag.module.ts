import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/tag/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/tag/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/tag/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

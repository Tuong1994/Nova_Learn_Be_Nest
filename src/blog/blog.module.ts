import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/blog/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/blog/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/blog/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

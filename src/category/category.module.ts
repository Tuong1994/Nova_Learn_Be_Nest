import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/category/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/category/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/category/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

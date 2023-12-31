import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/comment/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/comment/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/comment/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

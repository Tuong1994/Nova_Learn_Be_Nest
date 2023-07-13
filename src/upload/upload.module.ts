import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/upload/student',
        method: RequestMethod.POST,
      },
      {
        path: 'api/upload/course',
        method: RequestMethod.POST,
      },
    );
  }
}

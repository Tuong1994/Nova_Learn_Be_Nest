import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { ClassRoomController } from './classroom.controller';
import { ClassRoomService } from './classroom.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [ClassRoomController],
  providers: [ClassRoomService],
})
export class ClassRoomModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/classroom/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/classroom/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/classroom/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}

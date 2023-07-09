import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { CheckIdMiddleware } from 'src/common/middlewares/checkId.middleware';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(
      {
        path: 'api/student/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/student/update',
        method: RequestMethod.PUT,
      },
      {
        path: "api/student/remove",
        method: RequestMethod.DELETE
      }
    );
  }
}

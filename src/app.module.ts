import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';
import { CourseOutputModule } from './output/output.module';
import { CourseDurationModule } from './duration/duration.module';
import { CourseTopicModule } from './topic/topic.module';
import { CourseProjectModule } from './project/project.module';
import { ProjectTaskModule } from './task/task.module';
import { TaskToDoModule } from './todo/todo.module';
import { ClassRoomModule } from './classroom/classroom.module';
import { TagModule } from './tag/tag.module';
import { BlogModule } from './blog/blog.module';
import { CommentModule } from './comment/comment.module';
import { RateModule } from './rate/rate.module';
import { CityModule } from './city/city.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    StudentModule,
    CourseModule,
    CourseOutputModule,
    CourseDurationModule,
    CourseTopicModule,
    CourseProjectModule,
    ProjectTaskModule,
    TaskToDoModule,
    ClassRoomModule,
    TagModule,
    BlogModule,
    CommentModule,
    RateModule,
    CityModule,
    UploadModule,
  ],
})
export class AppModule {}

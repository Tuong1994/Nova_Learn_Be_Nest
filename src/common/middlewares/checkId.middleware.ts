import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import helper from '../helper';

@Injectable()
export class CheckIdMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const {
      studentId,
      courseId,
      outputId,
      durationId,
      topicId,
      projectId,
      taskId,
      todoId,
      classRoomId,
      ids,
    } = req.query;

    if (
      !ids &&
      !studentId &&
      !courseId &&
      !outputId &&
      !durationId &&
      !topicId &&
      !projectId &&
      !taskId &&
      !todoId &&
      !classRoomId
    )
      throw new HttpException('Id is not provided', HttpStatus.BAD_REQUEST);

    // Ids
    if (ids) next();

    // Student
    if (studentId) {
      helper.checkRecord({
        model: this.prisma.student,
        id: String(studentId),
        message: 'Student not found',
        res,
        next,
      });
    }

    // Course
    if (courseId) {
      helper.checkRecord({
        model: this.prisma.course,
        id: String(courseId),
        message: 'Course not found',
        res,
        next,
      });
    }

    //  Course output
    if (outputId) {
      helper.checkRecord({
        model: this.prisma.courseOutput,
        id: String(outputId),
        message: 'Output not found',
        res,
        next,
      });
    }

    // Course duration
    if (durationId) {
      helper.checkRecord({
        model: this.prisma.courseDuration,
        id: String(durationId),
        message: 'Duration not found',
        res,
        next,
      });
    }

    // Course topic
    if (topicId) {
      helper.checkRecord({
        model: this.prisma.courseTopic,
        id: String(topicId),
        message: 'Topic not found',
        res,
        next,
      });
    }

    // Course project
    if (projectId) {
      helper.checkRecord({
        model: this.prisma.courseProject,
        id: String(projectId),
        message: 'Project not found',
        res,
        next,
      });
    }

    // Project task
    if (taskId) {
      helper.checkRecord({
        model: this.prisma.projectTask,
        id: String(taskId),
        message: 'Task not found',
        res,
        next,
      });
    }

    // Task to do
    if (todoId) {
      helper.checkRecord({
        model: this.prisma.taskToDo,
        id: String(todoId),
        message: 'To do not found',
        res,
        next,
      });
    }

    // Class room
    if (classRoomId) {
      helper.checkRecord({
        model: this.prisma.classRoom,
        id: String(classRoomId),
        message: 'Class room not found',
        res,
        next,
      });
    }
  }
}

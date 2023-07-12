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
      tagId,
      blogId,
      commentId,
      rateId,
      cityId,
      districtId,
      wardId,
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
      !classRoomId &&
      !tagId &&
      !blogId &&
      !commentId &&
      !rateId &&
      !cityId &&
      !districtId &&
      !wardId
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

    // Tag
    if (tagId) {
      helper.checkRecord({
        model: this.prisma.tag,
        id: String(tagId),
        message: 'Tag not found',
        res,
        next,
      });
    }

    // Blog
    if (blogId) {
      helper.checkRecord({
        model: this.prisma.blog,
        id: String(blogId),
        message: 'Blog not found',
        res,
        next,
      });
    }

    // Comment
    if (commentId) {
      helper.checkRecord({
        model: this.prisma.comment,
        id: String(commentId),
        message: 'Comment not found',
        res,
        next,
      });
    }

    // Rate
    if (rateId) {
      helper.checkRecord({
        model: this.prisma.rate,
        id: String(rateId),
        message: 'Rate not found',
        res,
        next,
      });
    }

    // City
    if (cityId) {
      helper.checkRecord({
        model: this.prisma.city,
        id: String(cityId),
        message: 'City not found',
        res,
        next,
      });
    }

    // District
    if (districtId) {
      helper.checkRecord({
        model: this.prisma.district,
        id: String(districtId),
        message: 'District not found',
        res,
        next,
      });
    }

    // Ward
    if (wardId) {
      helper.checkRecord({
        model: this.prisma.ward,
        id: String(wardId),
        message: 'Ward not found',
        res,
        next,
      });
    }
  }
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CheckIdMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { studentId, courseId, ids } = req.query;

    if (!ids && !studentId && !courseId)
      throw new HttpException('Id is not provided', HttpStatus.BAD_REQUEST);

    // Ids
    if(ids) next();

    // Course
    if (courseId) {
      const course = await this.prisma.course.findUnique({
        where: { id: String(courseId) },
      });

      if (!course)
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);

      next();
    }
    // Student
    if (studentId) {
      const student = await this.prisma.student.findUnique({
        where: { id: String(studentId) },
      });

      if (!student)
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);

      next();
    }
  }
}

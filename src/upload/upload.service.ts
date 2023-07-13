import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryDto } from 'src/common/dto/base.dto';
import { ImageDto } from 'src/common/dto/image.dto';
import utils from 'src/common/utils';
import helper from 'src/common/helper';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async uploadStudentImage(query: QueryDto, file: Express.Multer.File) {
    if (!file) throw new HttpException('File or Image is required', HttpStatus.BAD_REQUEST);

    const { studentId } = query;

    const student = await this.prisma.student.findUnique({
      where: { id: String(studentId) },
      select: { avatar: true },
    });

    const image = helper.getImage({ t: 'single', f: file }) as ImageDto;

    const data = { ...image, studentId: String(studentId) };

    if (student) {
      if (student.avatar) {
        utils.removeFile(student.avatar.removePath);

        await this.prisma.image.update({
          where: { id: student.avatar.id },
          data,
        });
      } else {
        await this.prisma.image.create({ data });
      }
    }

    throw new HttpException('Upload success', HttpStatus.OK);
  }

  async uploadCourseImage(query: QueryDto, file: Express.Multer.File) {
    if (!file) throw new HttpException('File or Image is required', HttpStatus.BAD_REQUEST);

    const { courseId } = query;

    const course = await this.prisma.course.findUnique({
      where: { id: String(courseId) },
      select: { image: true },
    });

    const image = helper.getImage({ t: 'single', f: file });

    const data = { ...image, courseId: String(courseId) } as ImageDto;

    if (course) {
      if (course.image) {
        utils.removeFile(course.image.removePath);

        await this.prisma.image.update({
          where: { id: course.image.id },
          data,
        });
      } else {
        await this.prisma.image.create({ data });
      }
    }

    throw new HttpException('Upload success', HttpStatus.OK);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course, CourseDuration, CourseOutput } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { CourseDto } from 'src/common/dto/course.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageDto } from 'src/common/dto/image.dto';
import utils from 'src/common/utils';
import helper from 'src/common/helper';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async getCoursesPaging(query: QueryDto) {
    const { page, limit } = query;

    const courses = await this.prisma.course.findMany();

    let collection: IPaging<Course> = helper.getDefaultCollection();

    if (courses && courses.length) collection = utils.paging<Course>(courses, page, limit);

    return collection;
  }

  async getCourse(query: QueryDto) {
    const { courseId, topics, outputs, duration, classes, projects, tags } = query;

    const course = await this.prisma.course.findUnique({
      where: { id: String(courseId) },
      select: {
        id: true,
        nameVn: true,
        nameEng: true,
        descriptEng: true,
        descriptVn: true,
        projectInfoEng: true,
        projectInfoVn: true,
        fee: true,
        image: true,
        outputs: outputs ?? false,
        duration: duration ?? false,
        classes: classes ?? false,
        tags: tags ? { include: { tag: true } } : false,
        topics: topics ? { include: { tags: { include: { tag: true } } } } : false,
        projects: projects
          ? {
              include: {
                tasks: {
                  include: {
                    toDos: true,
                  },
                },
                tags: {
                  include: {
                    tag: true,
                  },
                },
              },
            }
          : false,
      },
    });

    let records = { ...course };

    // Convert tags list
    if (records.tags && records.tags.length) {
      records = { ...records, tags: records.tags.map((t) => t['tag']) };
      return records;
    }

    // Convert tags list of projects
    if (records.projects && records.projects.length) {
      records = {
        ...records,
        projects: records.projects.map((project) => {
          return {
            ...project,
            tags: project['tags']?.map((t: any) => t['tag']),
          };
        }),
      };
    }

    // Convert tags list of topics
    if (records.topics && records.topics.length) {
      records = {
        ...records,
        topics: records.topics.map((topic) => {
          return {
            ...topic,
            tags: topic['tags']?.map((t: any) => t['tag']),
          };
        }),
      };
    }

    return records;
  }

  async createCourse(file: Express.Multer.File, course: CourseDto) {
    const {
      nameEng,
      nameVn,
      descriptEng,
      descriptVn,
      categoryId,
      fee,
      projectInfoEng,
      projectInfoVn,
      duration,
      outputs,
    } = course;

    const newCourse = await this.prisma.course.create({
      data: {
        nameEng,
        nameVn,
        descriptEng,
        descriptVn,
        categoryId,
        fee: Number(fee),
        projectInfoEng: projectInfoEng ? projectInfoEng : undefined,
        projectInfoVn: projectInfoVn ? projectInfoVn : undefined,
      },
    });

    if (newCourse) {
      if (outputs) {
        const outputJson = helper.parseJson<CourseOutput[]>(outputs);

        const data = outputJson.map((output) => {
          return { ...output, courseId: newCourse.id };
        });

        await this.prisma.courseOutput.createMany({ data });
      }

      if (duration) {
        const durationJson = helper.parseJson<CourseDuration>(duration);

        const data = { ...durationJson, courseId: newCourse.id };

        await this.prisma.courseDuration.create({ data });
      }

      if (file) {
        const image = helper.getImage({ t: 'single', f: file }) as ImageDto;

        const data = { ...image, courseId: newCourse.id };

        await this.prisma.image.create({ data });
      }
    }

    return newCourse;
  }

  async updateCourse(query: QueryDto, file: Express.Multer.File, course: CourseDto) {
    const { courseId } = query;
    const {
      nameEng,
      nameVn,
      descriptEng,
      descriptVn,
      categoryId,
      fee,
      projectInfoEng,
      projectInfoVn,
    } = course;

    await this.prisma.course.update({
      where: {
        id: String(courseId),
      },
      data: {
        nameEng,
        nameVn,
        descriptEng,
        descriptVn,
        categoryId,
        fee: Number(fee),
        projectInfoEng,
        projectInfoVn,
      },
    });

    if (file) {
      const image = helper.getImage({ t: 'single', f: file }) as ImageDto;

      const data = { ...image, courseId: String(courseId) };

      const course = await this.prisma.course.findUnique({
        where: { id: String(courseId) },
        select: { image: true },
      });

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
    }

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeCourse(query: QueryDto) {
    const { ids } = query;

    const listId = String(ids).split(',');

    const courses = await this.prisma.course.findMany({
      where: { id: { in: listId } },
    });

    if (courses && courses.length) {
      await this.prisma.course.deleteMany({ where: { id: { in: listId } } });

      throw new HttpException('Remove success', HttpStatus.OK);
    }

    throw new HttpException('Courses not found', HttpStatus.NOT_FOUND);
  }
}

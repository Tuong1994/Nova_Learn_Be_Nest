import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CourseDuration } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { DurationDto } from 'src/common/dto/duration.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import utils from 'src/common/utils';
import helper from 'src/common/helper';

@Injectable()
export class CourseDurationService {
  constructor(private prisma: PrismaService) {}

  async getDurationsPaging(query: QueryDto) {
    const { page, limit } = query;

    const durations = await this.prisma.courseDuration.findMany();

    let collection: IPaging<CourseDuration> = helper.getDefaultCollection();

    if (durations && durations.length) collection = utils.paging<CourseDuration>(durations, page, limit);

    return collection;
  }

  async getDuration(query: QueryDto) {
    const { durationId } = query;

    const duration = await this.prisma.courseDuration.findUnique({
      where: { id: String(durationId) },
    });

    return duration;
  }

  async createDuration(duration: DurationDto) {
    const { month, week, session, courseId } = duration;

    const newDuration = await this.prisma.courseDuration.create({
      data: {
        month,
        week,
        session,
        courseId,
      },
    });

    return newDuration;
  }

  async updateDuration(query: QueryDto, duration: DurationDto) {
    const { durationId } = query;
    const { month, week, session, courseId } = duration;

    await this.prisma.courseDuration.update({
      where: { id: String(durationId) },
      data: {
        month,
        week,
        session,
        courseId,
      },
    });

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeDuration(query: QueryDto) {
    const { ids } = query;

    const listId = String(ids).split(',');

    const durations = await this.prisma.courseDuration.findMany({
      where: { id: { in: listId } },
    });

    if (durations && durations.length) {
      await this.prisma.courseDuration.deleteMany({ where: { id: { in: listId } } });

      throw new HttpException('Remove success', HttpStatus.OK);
    }

    throw new HttpException('Duration not found', HttpStatus.NOT_FOUND);
  }
}

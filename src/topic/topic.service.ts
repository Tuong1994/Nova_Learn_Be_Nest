import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CourseTopic } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TopicDto } from 'src/common/dto/topic.dto';
import utils from 'src/common/utils';
import helper from 'src/common/helper';

@Injectable()
export class CourseTopicService {
  constructor(private prisma: PrismaService) {}

  async getTopicsPaging(query: QueryDto) {
    const { page, limit } = query;

    const topics = await this.prisma.courseTopic.findMany();

    let collection: IPaging<CourseTopic> = helper.getDefaultCollection();

    if (topics && topics.length) collection = utils.paging<CourseTopic>(topics, page, limit);

    return collection;
  }

  async getTopic(query: QueryDto) {
    const { topicId } = query;

    const topic = await this.prisma.courseTopic.findUnique({ where: { id: String(topicId) } });

    return topic;
  }

  async createTopic(topic: TopicDto[]) {
    if (topic && !topic.length)
      throw new HttpException('Topic is required', HttpStatus.BAD_REQUEST);

    await this.prisma.courseTopic.createMany({
      data: topic,
    });

    throw new HttpException('Create success', HttpStatus.CREATED);
  }

  async updateTopic(query: QueryDto, topic: TopicDto) {
    const { topicId } = query;
    const { nameEng, nameVn, courseId } = topic;

    await this.prisma.courseTopic.update({
      where: { id: String(topicId) },
      data: { nameEng, nameVn, courseId },
    });

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeTopic(query: QueryDto) {
    const { ids } = query;

    const listId = String(ids).split(',');

    const topics = await this.prisma.courseTopic.findMany({ where: { id: { in: listId } } });

    if (topics && topics.length) {
      await this.prisma.courseTopic.deleteMany({ where: { id: { in: listId } } });

      throw new HttpException('Remove success', HttpStatus.OK);
    }

    throw new HttpException('Topic not found', HttpStatus.NOT_FOUND);
  }
}

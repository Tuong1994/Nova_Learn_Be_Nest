import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagDto } from 'src/common/dto/tag.dto';
import helper from 'src/common/helper';
import utils from 'src/common/utils';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async getTagsPaging(query: QueryDto) {
    const { page, limit } = query;

    const tags = await this.prisma.tag.findMany();

    let collection: IPaging<Tag> = helper.getDefaultCollection();

    if (tags && tags.length) collection = utils.paging<Tag>(tags, page, limit);

    return collection;
  }

  async getTag(query: QueryDto) {
    const { tagId } = query;

    const tag = await this.prisma.tag.findUnique({ where: { id: String(tagId) } });

    return tag;
  }

  async createTag(tag: TagDto) {
    const { nameEng, nameVn } = tag;

    const newTag = await this.prisma.tag.create({
      data: { nameEng, nameVn },
    });

    return newTag;
  }

  async updateTag(query: QueryDto, tag: TagDto) {
    const { tagId } = query;
    const { nameEng, nameVn } = tag;

    await this.prisma.tag.update({
      where: { id: String(tagId) },
      data: { nameEng, nameVn },
    });

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeTag(query: QueryDto) {
    const { ids } = query;

    const listId = String(ids).split(',');

    const tags = await this.prisma.tag.findMany({ where: { id: { in: listId } } });

    if (tags && tags.length) {
      await this.prisma.tag.deleteMany({ where: { id: { in: listId } } });

      throw new HttpException('Remove success', HttpStatus.OK);
    }

    throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
  }
}

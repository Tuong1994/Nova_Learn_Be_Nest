import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Rate } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RateDto } from 'src/common/dto/rate.dto';
import helper from 'src/common/helper';
import utils from 'src/common/utils';

@Injectable()
export class RateService {
  constructor(private prisma: PrismaService) {}

  async getRatesPaging(query: QueryDto) {
    const { page, limit } = query;

    const rates = await this.prisma.rate.findMany();

    let collection: IPaging<Rate> = helper.getDefaultCollection();

    if (rates && rates.length) collection = utils.paging<Rate>(rates, page, limit);

    return collection;
  }

  async getRate(query: QueryDto) {
    const { rateId } = query;

    const rate = await this.prisma.rate.findUnique({ where: { id: String(rateId) } });

    return rate;
  }

  async createRate(rate: RateDto) {
    const { point, note, studentId, courseId } = rate;

    const newRate = await this.prisma.rate.create({
      data: { point, note, studentId, courseId },
    });

    return newRate;
  }

  async updateRate(query: QueryDto, rate: RateDto) {
    const { rateId } = query;
    const { point, note, studentId, courseId } = rate;

    await this.prisma.rate.update({
      where: { id: String(rateId) },
      data: { point, note, studentId, courseId },
    });

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeRate(query: QueryDto) {
    const { ids } = query;

    const listId = String(ids).split(',');

    const rates = await this.prisma.rate.findMany({ where: { id: { in: listId } } });

    if (rates && rates.length) {
      await this.prisma.rate.deleteMany({ where: { id: { in: listId } } });

      throw new HttpException('Remove success', HttpStatus.OK);
    }

    throw new HttpException('Rate not found', HttpStatus.NOT_FOUND);
  }
}

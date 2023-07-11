import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient, Ward } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { WardDto } from 'src/common/dto/ward.dto';
import helper from 'src/common/helper';
import utils from 'src/common/utils';

@Injectable()
export class WardService {
  constructor(private prisma: PrismaClient) {}

  async getWardsPaging(query: QueryDto) {
    const { page, limit } = query;

    const wards = await this.prisma.ward.findMany();

    let collection: IPaging<Ward> = helper.getDefaultCollection();

    if (wards && wards.length) collection = utils.paging<Ward>(wards, page, limit);

    return collection;
  }

  async getWard(query: QueryDto) {
    const { wardId } = query;

    const ward = await this.prisma.ward.findUnique({ where: { id: String(wardId) } });

    return ward;
  }

  async createWard(ward: WardDto) {
    const { nameEng, nameVn, code, districtCode } = ward;

    const newWard = await this.prisma.ward.create({
      data: { nameEng, nameVn, code, districtCode },
    });

    return newWard;
  }

  async updateWard(query: QueryDto, ward: WardDto) {
    const { wardId } = query;
    const { nameEng, nameVn, code, districtCode } = ward;

    await this.prisma.ward.update({
      where: { id: String(wardId) },
      data: { nameEng, nameVn, code, districtCode },
    });

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeWard(query: QueryDto) {
    const { ids } = query;

    const listId = String(ids).split(',');

    const wards = await this.prisma.ward.findMany({ where: { id: { in: listId } } });

    if (wards && wards.length) {
      await this.prisma.ward.deleteMany({ where: { id: { in: listId } } });

      throw new HttpException('Remove success', HttpStatus.OK);
    }

    throw new HttpException('Ward not found', HttpStatus.NOT_FOUND);
  }
}

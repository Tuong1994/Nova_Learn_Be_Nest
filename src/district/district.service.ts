import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { District } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { DistrictDto } from 'src/common/dto/district.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import helper from 'src/common/helper';
import utils from 'src/common/utils';

@Injectable()
export class DistrictService {
  constructor(private prisma: PrismaService) {}

  async getDistrictsPaging(query: QueryDto) {
    const { page, limit } = query;

    const districts = await this.prisma.district.findMany();

    let collection: IPaging<District> = helper.getDefaultCollection();

    if (districts && districts.length) collection = utils.paging<District>(districts, page, limit);

    return collection;
  }

  async getDistrict(query: QueryDto) {
    const { districtId } = query;

    const district = await this.prisma.district.findUnique({ where: { id: String(districtId) } });

    return district;
  }

  async createDistrict(district: DistrictDto) {
    const { nameEng, nameVn, code, cityCode } = district;

    const newDistrict = await this.prisma.district.create({
      data: { nameEng, nameVn, code, cityCode },
    });

    return newDistrict;
  }

  async updateDistrict(query: QueryDto, district: DistrictDto) {
    const { districtId } = query;
    const { nameEng, nameVn, code, cityCode } = district;

    await this.prisma.district.update({
      where: { id: String(districtId) },
      data: { nameEng, nameVn, code, cityCode },
    });

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeDistrict(query: QueryDto) {
    const { ids } = query;

    const listId = String(ids).split(',');

    const districts = await this.prisma.district.findMany({ where: { id: { in: listId } } });

    if (districts && districts.length) {
      await this.prisma.district.deleteMany({ where: { id: { in: listId } } });

      throw new HttpException('Remove success', HttpStatus.OK);
    }

    throw new HttpException('District not found', HttpStatus.NOT_FOUND);
  }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { City } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CityDto } from 'src/common/dto/city.dto';
import helper from 'src/common/helper';
import utils from 'src/common/utils';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async getCitiesPaging(query: QueryDto) {
    const { page, limit } = query;

    const cities = await this.prisma.city.findMany();

    let collection: IPaging<City> = helper.getDefaultCollection();

    if (cities && cities.length) collection = utils.paging<City>(cities, page, limit);

    return collection;
  }

  async getCity(query: QueryDto) {
    const { cityId } = query;

    const city = await this.prisma.city.findUnique({ where: { id: String(cityId) } });

    return city;
  }

  async createCity(city: CityDto) {
    const { nameEng, nameVn, code } = city;

    const newCity = await this.prisma.city.create({
      data: { nameEng, nameVn, code },
    });

    return newCity;
  }

  async updateCity(query: QueryDto, city: CityDto) {
    const { cityId } = query;
    const { nameEng, nameVn, code } = city;

    await this.prisma.city.update({
      where: { id: String(cityId) },
      data: { nameEng, nameVn, code },
    });

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeCity(query: QueryDto) {
    const { cityId } = query;

    const listId = String(cityId).split(',');

    const cities = await this.prisma.city.findMany({ where: { id: { in: listId } } });

    if (cities && cities.length) {
      await this.prisma.city.deleteMany({ where: { id: { in: listId } } });

      throw new HttpException('Remove success', HttpStatus.OK);
    }

    throw new HttpException('City not found', HttpStatus.NOT_FOUND);
  }
}

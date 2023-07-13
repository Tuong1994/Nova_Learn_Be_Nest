import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Category } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { CategoryDto } from 'src/common/dto/category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import helper from 'src/common/helper';
import utils from 'src/common/utils';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategoriesPaging(query: QueryDto) {
    const { page, limit } = query;

    const categories = await this.prisma.category.findMany();

    let collection: IPaging<Category> = helper.getDefaultCollection();

    if (categories && categories.length)
      collection = utils.paging<Category>(categories, page, limit);

    return collection;
  }

  async getCategory(query: QueryDto) {
    const { categoryId } = query;

    const category = await this.prisma.category.findUnique({ where: { id: String(categoryId) } });

    return category;
  }

  async createCategory(category: CategoryDto) {
    const { nameEng, nameVn } = category;

    const newCategory = await this.prisma.category.create({ data: { nameEng, nameVn } });

    return newCategory;
  }

  async updateCategory(query: QueryDto, category: CategoryDto) {
    const { categoryId } = query;
    const { nameEng, nameVn } = category;

    await this.prisma.category.update({
      where: { id: String(categoryId) },
      data: { nameEng, nameVn },
    });

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeCategory(query: QueryDto) {
    const { categoryId } = query;

    await this.prisma.category.delete({ where: { id: String(categoryId) } });

    throw new HttpException('Remove success', HttpStatus.OK);
  }
}

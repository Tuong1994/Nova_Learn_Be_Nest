import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Blog } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { BlogDto } from 'src/common/dto/blog.dto';
import helper from 'src/common/helper';
import utils from 'src/common/utils';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async getBlogsPaging(query: QueryDto) {
    const { page, limit } = query;

    const blogs = await this.prisma.blog.findMany();

    let collection: IPaging<Blog> = helper.getDefaultCollection();

    if (blogs && blogs.length) collection = utils.paging<Blog>(blogs, page, limit);

    return collection;
  }

  async getBlog(query: QueryDto) {
    const { blogId } = query;

    const blog = await this.prisma.blog.findUnique({ where: { id: String(blogId) } });

    return blog;
  }

  async createBlog(blog: BlogDto) {
    const { content } = blog;

    const newBlog = await this.prisma.blog.create({ data: { content } });

    return newBlog;
  }

  async updateBlog(query: QueryDto, blog: BlogDto) {
    const { blogId } = query;
    const { content } = blog;

    await this.prisma.blog.update({
      where: { id: String(blogId) },
      data: { content },
    });

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeBlog(query: QueryDto) {
    const { ids } = query;

    const listId = String(ids).split(',');

    const blogs = await this.prisma.blog.findMany({ where: { id: { in: listId } } });

    if (blogs && blogs.length) {
      await this.prisma.blog.deleteMany({ where: { id: { in: listId } } });

      throw new HttpException('Remove success', HttpStatus.OK);
    }

    throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
  }
}

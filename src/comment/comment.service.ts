import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from 'src/common/dto/comment.dto';
import helper from 'src/common/helper';
import utils from 'src/common/utils';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getCommentsPaging(query: QueryDto) {
    const { page, limit } = query;

    const comments = await this.prisma.comment.findMany();

    let collection: IPaging<Comment> = helper.getDefaultCollection();

    if (comments && comments.length) collection = utils.paging<Comment>(comments, page, limit);

    return collection;
  }

  async getComment(query: QueryDto) {
    const { commentId } = query;

    const comment = await this.prisma.comment.findUnique({ where: { id: String(commentId) } });

    return comment;
  }

  async createComment(comment: CommentDto) {
    const { commentText, studentId, courseId, blogId } = comment;

    const newComment = await this.prisma.comment.create({
      data: { commentText, studentId, courseId, blogId },
    });

    return newComment;
  }

  async updateComment(query: QueryDto, comment: CommentDto) {
    const { commentId } = query;
    const { commentText, studentId, courseId, blogId } = comment;

    await this.prisma.comment.update({
      where: { id: String(commentId) },
      data: { commentText, studentId, courseId, blogId },
    });

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeComment(query: QueryDto) {
    const { ids } = query;

    const listId = String(ids).split(',');

    const comments = await this.prisma.comment.findMany({ where: { id: { in: listId } } });

    if (comments && comments.length) {
      await this.prisma.comment.deleteMany({ where: { id: { in: listId } } });

      throw new HttpException('Remove success', HttpStatus.OK);
    }

    throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
  }
}

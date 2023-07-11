import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { QueryDto } from 'src/common/dto/base.dto';
import { CommentDto } from 'src/common/dto/comment.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('listPaging')
  getCommentsPaging(@QueryPaging() query: QueryDto) {
    return this.commentService.getCommentsPaging(query);
  }

  @Get('detail')
  getComment(@Query() query: QueryDto) {
    return this.commentService.getComment(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createComment(@Body() comment: CommentDto) {
    return this.commentService.createComment(comment);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateComment(@Query() query: QueryDto, @Body() comment: CommentDto) {
    return this.commentService.updateComment(query, comment);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeComment(@Query() query: QueryDto) {
    return this.commentService.removeComment(query);
  }
}

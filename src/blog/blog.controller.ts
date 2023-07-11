import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { QueryDto } from 'src/common/dto/base.dto';
import { BlogDto } from 'src/common/dto/blog.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('listPaging')
  getBlogsPaging(@QueryPaging() query: QueryDto) {
    return this.blogService.getBlogsPaging(query);
  }

  @Get('detail')
  getBlog(@Query() query: QueryDto) {
    return this.blogService.getBlog(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createBlog(@Body() blog: BlogDto) {
    return this.blogService.createBlog(blog);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateBlog(@Query() query: QueryDto, @Body() blog: BlogDto) {
    return this.blogService.updateBlog(query, blog);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeBlog(@Query() query: QueryDto) {
    return this.blogService.removeBlog(query);
  }
}

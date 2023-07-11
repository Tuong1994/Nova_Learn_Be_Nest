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
import { TagService } from './tag.service';
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { QueryDto } from 'src/common/dto/base.dto';
import { TagDto } from 'src/common/dto/tag.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get('listPaging')
  getTagsPaging(@QueryPaging() query: QueryDto) {
    return this.tagService.getTagsPaging(query);
  }

  @Get('detail')
  getTag(@Query() query: QueryDto) {
    return this.tagService.getTag(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createTag(@Body() tag: TagDto) {
    return this.tagService.createTag(tag);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateTag(@Query() query: QueryDto, @Body() tag: TagDto) {
    return this.tagService.updateTag(query, tag);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeTag(@Query() query: QueryDto) {
    return this.tagService.removeTag(query);
  }
}

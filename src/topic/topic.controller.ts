import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CourseTopicService } from './topic.service';
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { QueryDto } from 'src/common/dto/base.dto';
import { TopicDto } from 'src/common/dto/topic.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/topic')
export class CourseTopicController {
  constructor(private courseTopicService: CourseTopicService) {}

  @Get('listPaging')
  getTopicsPaging(@QueryPaging() query: QueryDto) {
    return this.courseTopicService.getTopicsPaging(query);
  }

  @Get('detail')
  getTopic(@Query() query: QueryDto) {
    return this.courseTopicService.getTopic(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createTopic(@Body() topic: TopicDto[]) {
    return this.courseTopicService.createTopic(topic);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateTopic(@Query() query: QueryDto, @Body() topic: TopicDto) {
    return this.courseTopicService.updateTopic(query, topic);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeTopic(@Query() query: QueryDto) {
    return this.courseTopicService.removeTopic(query);
  }
}

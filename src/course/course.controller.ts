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
import { CourseService } from './course.service';
import { QueryDto } from 'src/common/dto/base.dto';
import { CourseDto } from 'src/common/dto/course.dto';
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('listPaging')
  getCoursesPaging(@QueryPaging() query: QueryDto) {
    return this.courseService.getCoursesPaging(query);
  }

  @Get('detail')
  getCourse(@Query() query: QueryDto) {
    return this.courseService.getCourse(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createCourse(@Body() course: CourseDto) {
    return this.courseService.createCourse(course);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateCourse(@Query() query: QueryDto, @Body() course: CourseDto) {
    return this.courseService.updateCourse(query, course);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeCourse(@Query() query: QueryDto) {
    return this.courseService.removeCourse(query);
  }
}

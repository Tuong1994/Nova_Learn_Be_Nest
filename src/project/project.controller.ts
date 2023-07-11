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
import { CourseProjectService } from './project.service';
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { QueryDto } from 'src/common/dto/base.dto';
import { ProjectDto } from 'src/common/dto/project.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/project')
export class CourseProjectController {
  constructor(private courseProjectService: CourseProjectService) {}

  @Get('listPaging')
  getProjectsPaging(@QueryPaging() query: QueryDto) {
    return this.courseProjectService.getProjectsPaging(query);
  }

  @Get('detail')
  getProject(@Query() query: QueryDto) {
    return this.courseProjectService.getProject(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createProject(@Body() project: ProjectDto) {
    return this.courseProjectService.createProject(project);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateProject(@Query() query: QueryDto, @Body() project: ProjectDto) {
    return this.courseProjectService.updateProject(query, project);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeProject(@Query() query: QueryDto) {
    return this.courseProjectService.removeProject(query);
  }
}

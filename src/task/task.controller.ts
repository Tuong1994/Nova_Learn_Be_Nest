import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProjectTaskService } from './task.service';
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { QueryDto } from 'src/common/dto/base.dto';
import { TaskDto } from 'src/common/dto/task.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/task')
export class ProjectTaskController {
  constructor(private projectTaskService: ProjectTaskService) {}

  @Get('listPaging')
  getTasksPaging(@QueryPaging() query: QueryDto) {
    return this.projectTaskService.getTasksPaging(query);
  }

  @Get('detail')
  getTask(@Query() query: QueryDto) {
    return this.projectTaskService.getTask(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createTask(@Body() task: TaskDto) {
    return this.projectTaskService.createTask(task);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateTask(@Query() query: QueryDto, @Body() task: TaskDto) {
    return this.projectTaskService.updateTask(query, task);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeTask(@Query() query: QueryDto) {
    return this.projectTaskService.removeTask(query);
  }
}

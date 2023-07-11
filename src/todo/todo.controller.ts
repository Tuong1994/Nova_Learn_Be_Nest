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
import { TaskToDoService } from './todo.service';
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { QueryDto } from 'src/common/dto/base.dto';
import { ToDoDto } from 'src/common/dto/todo.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/todo')
export class TaskToDoController {
  constructor(private taskToDoService: TaskToDoService) {}

  @Get('listPaging')
  getToDosPaging(@QueryPaging() query: QueryDto) {
    return this.taskToDoService.getToDosPaging(query);
  }

  @Get('detail')
  getToDo(@Query() query: QueryDto) {
    return this.taskToDoService.getToDo(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createToDo(@Body() toDo: ToDoDto) {
    return this.taskToDoService.createToDo(toDo);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateToDo(@Query() query: QueryDto, @Body() toDo: ToDoDto) {
    return this.taskToDoService.updateToDo(query, toDo);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeToDo(@Query() query: QueryDto) {
    return this.taskToDoService.removeToDo(query);
  }
}

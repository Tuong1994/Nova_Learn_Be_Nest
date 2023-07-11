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
import { ClassRoomService } from './classroom.service';
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { QueryDto } from 'src/common/dto/base.dto';
import { ClassRoomDto } from 'src/common/dto/classroom.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/classroom')
export class ClassRoomController {
  constructor(private classRoomService: ClassRoomService) {}

  @Get('listPaging')
  getClassRoomsPaging(@QueryPaging() query: QueryDto) {
    return this.classRoomService.getClassRoomsPaging(query);
  }

  @Get('detail')
  getClassRoom(@Query() query: QueryDto) {
    return this.classRoomService.getClassRoom(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createClassRoom(@Body() classRoom: ClassRoomDto) {
    return this.classRoomService.createClassRoom(classRoom);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateClassRoom(@Query() query: QueryDto, @Body() classRoom: ClassRoomDto) {
    return this.classRoomService.updateClassRoom(query, classRoom);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeClassRoom(@Query() query: QueryDto) {
    return this.classRoomService.removeClassRoom(query);
  }
}

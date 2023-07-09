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
import { StudentService } from './student.service';
import { QueryDto } from 'src/common/dto/base.dto';
import { CreateStudentDto, UpdateStudentDto } from 'src/common/dto/student.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { QueryPaging } from 'src/common/decorator/query.decorator';

@Controller('api/student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('listPaging')
  getStudentsPaging(@QueryPaging() query: QueryDto) {
    return this.studentService.getStudentsPaging(query);
  }

  @Get('detail')
  @UseGuards(JwtGuard)
  getStudent(@Query() query: QueryDto) {
    return this.studentService.getStudent(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createStudent(@Body() student: CreateStudentDto) {
    return this.studentService.createStudent(student);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateStudent(@Query() query: QueryDto, @Body() student: UpdateStudentDto) {
    return this.studentService.updateStudent(query, student);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeStudent(@Query() query: QueryDto) {
    return this.studentService.removeStudent(query);
  }
}

import { Controller, Post, UseInterceptors, UploadedFile, Query, UseGuards } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/common/config/multer.config';
import { QueryDto } from 'src/common/dto/base.dto';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';

@Controller('api/upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('student')
  @Roles(ERole.ADMIN, ERole.STUDENT)
  @UseGuards(JwtGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('avatar', multerOption('./assets/image/student')))
  uploadStudentImage(@Query() query: QueryDto, @UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadStudentImage(query, file);
  }

  @Post('course')
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image', multerOption('./assets/image/course')))
  uploadCourseImage(@Query() query: QueryDto, @UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadCourseImage(query, file);
  }
}

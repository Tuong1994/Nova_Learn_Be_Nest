import { Controller, Get } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('api/course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('list')
  getCourses() {
    return this.courseService.getCourses();
  }
}

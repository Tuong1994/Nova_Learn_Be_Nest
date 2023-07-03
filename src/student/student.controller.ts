import { Controller } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller()
export class StudentController {
    constructor(private studentService: StudentService) {}
    
}
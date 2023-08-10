import { IsNotEmpty } from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  courseId: string;

  @IsNotEmpty()
  studentId: string;

  @IsNotEmpty()
  classroomId: string;
}

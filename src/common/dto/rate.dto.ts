import { IsNotEmpty, IsOptional } from 'class-validator';

export class RateDto {
  @IsNotEmpty()
  point: number;

  @IsOptional()
  note: string;

  @IsNotEmpty()
  studentId: string;

  @IsNotEmpty()
  courseId: string;
}

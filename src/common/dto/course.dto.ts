import { CourseDuration, CourseOutput } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CourseDto {
  @IsNotEmpty()
  nameEng: string;

  @IsNotEmpty()
  nameVn: string;

  @IsNotEmpty()
  descriptEng: string;

  @IsNotEmpty()
  descriptVn: string;

  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  fee: number;

  @IsOptional()
  projectInfoEng: string;

  @IsOptional()
  projectInfoVn: string;

  @IsOptional()
  duration: string;

  @IsOptional()
  outputs: string;
}

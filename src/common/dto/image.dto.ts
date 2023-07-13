import { IsNotEmpty, IsOptional } from 'class-validator';

export class ImageDto {
  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  size: number;

  @IsNotEmpty()
  removePath: string;

  @IsOptional()
  courseId: string;

  @IsOptional()
  studentId: string;
}

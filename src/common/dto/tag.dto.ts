import { IsNotEmpty, IsOptional } from 'class-validator';

export class TagDto {
  @IsNotEmpty()
  nameEng: string;

  @IsNotEmpty()
  nameVn: string;

  @IsOptional()
  courseId: string;

  @IsOptional()
  projectId: string;

  @IsOptional()
  topicId: string;
}

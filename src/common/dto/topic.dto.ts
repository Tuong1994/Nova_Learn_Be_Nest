import { IsNotEmpty } from 'class-validator';

export class TopicDto {
  @IsNotEmpty()
  nameEng: string;

  @IsNotEmpty()
  nameVn: string;

  @IsNotEmpty()
  courseId: string;
}

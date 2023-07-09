import { IsNotEmpty } from 'class-validator';

export class OutputDto {
  @IsNotEmpty()
  contentEng: string;

  @IsNotEmpty()
  contentVn: string;

  @IsNotEmpty()
  courseId: string;
}

import { IsNotEmpty } from 'class-validator';

export class ProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  descriptEng: string;

  @IsNotEmpty()
  descriptVn: string;

  @IsNotEmpty()
  courseId: string;
}

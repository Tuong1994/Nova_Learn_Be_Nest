import { IsNotEmpty } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  nameEng: string;

  @IsNotEmpty()
  nameVn: string;

  @IsNotEmpty()
  projectId: string;
}

import { IsNotEmpty } from 'class-validator';

export class ToDoDto {
  @IsNotEmpty()
  contentEng: string;

  @IsNotEmpty()
  contentVn: string;

  @IsNotEmpty()
  taskId: string;
}

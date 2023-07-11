import { IsNotEmpty } from 'class-validator';

export class DurationDto {
  @IsNotEmpty()
  month: number;

  @IsNotEmpty()
  week: number;

  @IsNotEmpty()
  session: number;

  @IsNotEmpty()
  courseId: string;
}

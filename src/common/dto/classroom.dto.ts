import { IsNotEmpty, IsNumber } from 'class-validator';

export class ClassRoomDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  openDate: string;

  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  @IsNumber()
  location: number;

  @IsNotEmpty()
  courseId: string;
}

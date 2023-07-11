import { IsNotEmpty } from 'class-validator';

export class BlogDto {
  @IsNotEmpty()
  content: string;
}

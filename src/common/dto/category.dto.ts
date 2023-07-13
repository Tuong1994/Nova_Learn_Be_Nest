import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  nameEng: string;

  @IsNotEmpty()
  nameVn: string;
}

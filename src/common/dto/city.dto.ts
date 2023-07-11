import { IsNotEmpty } from 'class-validator';

export class CityDto {
  @IsNotEmpty()
  nameEng: string;

  @IsNotEmpty()
  nameVn: string;

  @IsNotEmpty()
  code: string;
}

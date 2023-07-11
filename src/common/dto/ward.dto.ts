import { IsNotEmpty } from 'class-validator';

export class WardDto {
  @IsNotEmpty()
  nameEng: string;

  @IsNotEmpty()
  nameVn: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  districtCode: string;
}

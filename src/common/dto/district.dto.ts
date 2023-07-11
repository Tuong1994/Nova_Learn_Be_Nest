import { IsNotEmpty } from 'class-validator';

export class DistrictDto {
  @IsNotEmpty()
  nameEng: string;

  @IsNotEmpty()
  nameVn: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  cityCode: string;
}

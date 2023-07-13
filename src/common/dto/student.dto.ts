import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  account: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  gender: number;

  @IsOptional()
  birthday: string;

  @IsOptional()
  address: string;

  @IsOptional()
  cityCode: string;

  @IsOptional()
  districtCode: string;

  @IsOptional()
  wardCode: string;

  @IsNotEmpty()
  role: number;
}

export class UpdateStudentDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  gender: number;

  @IsOptional()
  birthday: string;

  @IsOptional()
  address: string;

  @IsOptional()
  cityCode: string;

  @IsOptional()
  districtCode: string;

  @IsOptional()
  wardCode: string;

  @IsNotEmpty()
  role: number;
}

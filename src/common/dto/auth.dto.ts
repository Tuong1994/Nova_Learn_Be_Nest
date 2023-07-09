import { IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  account: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  phone: string

  @IsNotEmpty()
  email: string
}

export class SignInDto {
  @IsNotEmpty()
  account: string;

  @IsNotEmpty()
  password: string;
}

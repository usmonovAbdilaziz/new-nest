import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCilentDto {
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

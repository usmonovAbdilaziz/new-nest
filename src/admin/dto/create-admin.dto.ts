import { IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Role } from '../entities/admin.entity';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role, { message: 'Role faqat admin yoki user bula oladi' })
  role: Role;
}

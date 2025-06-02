import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { UserRole } from 'src/user/entities/users.entity';

export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  role?: UserRole; // Optional, can default to 'dealer' elsewhere
}

export class LoginAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
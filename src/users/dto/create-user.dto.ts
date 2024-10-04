import { IsString, IsInt, IsEmail, Min, MaxLength, IsOptional, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  nombre: string;

  @IsString()
  @MaxLength(50)
  apellido: string;

  @IsInt()
  @Min(0)
  edad: number;

  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(100)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

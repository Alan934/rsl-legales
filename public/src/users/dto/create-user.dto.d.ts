import { Role } from '@prisma/client';
export declare class CreateUserDto {
    nombre: string;
    apellido: string;
    edad: number;
    email: string;
    password: string;
    role?: Role;
}

import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, Max, MaxLength } from "class-validator";
import { number } from "joi";

export class CreateFormularioDto {
    @IsString()
    @MaxLength(50)
    nombreCompleto: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MaxLength(13)
    telefono: string;

    @IsString()
    @IsNotEmpty()
    mensaje: string;

    //usuarioId: Usuario
    @IsNotEmpty()
    @Type(() => number)
    servicioId: number;
}

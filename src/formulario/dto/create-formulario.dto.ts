import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, Max, MaxLength } from "class-validator";

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
    @IsNumber()
    @IsNotEmpty()
    servicioId: number;
}

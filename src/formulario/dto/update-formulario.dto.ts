import { PartialType } from '@nestjs/mapped-types';
import { CreateFormularioDto } from './create-formulario.dto';
import { IsString, MaxLength } from 'class-validator';

export class UpdateFormularioDto extends PartialType(CreateFormularioDto) {
    @IsString()
    @MaxLength(50)
    nombre: string;

}

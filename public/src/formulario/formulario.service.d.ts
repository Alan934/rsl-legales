import { OnModuleInit } from '@nestjs/common';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { PrismaClient } from '@prisma/client';
export declare class FormularioService extends PrismaClient implements OnModuleInit {
    private readonly logger;
    onModuleInit(): void;
    getServiciosEnum(): {
        serviciosRequeridos: any[];
    };
    create(createFormularioDto: CreateFormularioDto): Promise<any>;
    exists(id: number): Promise<any>;
    findAll(): any;
    findOne(id: number): Promise<any>;
    update(id: number, updateFormularioDto: UpdateFormularioDto): any;
    remove(id: number): Promise<any>;
    updateAvailable(id: number): Promise<any>;
}

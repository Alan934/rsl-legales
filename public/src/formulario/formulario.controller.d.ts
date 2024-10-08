import { FormularioService } from './formulario.service';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
export declare class FormularioController {
    private readonly formularioService;
    constructor(formularioService: FormularioService);
    create(createFormularioDto: CreateFormularioDto): Promise<any>;
    getServicioRequeridoEnum(): {
        serviciosRequeridos: any[];
    };
    findAll(): any;
    findOne(id: string): Promise<any>;
    update(id: string, updateFormularioDto: UpdateFormularioDto): any;
    remove(id: string): Promise<any>;
}

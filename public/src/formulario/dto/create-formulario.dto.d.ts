import { ServicioRequerido } from "@prisma/client";
export declare class CreateFormularioDto {
    nombreCompleto: string;
    email: string;
    telefono: string;
    servicioRequerido: ServicioRequerido;
    mensaje: string;
}

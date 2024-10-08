"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormularioService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let FormularioService = exports.FormularioService = class FormularioService extends client_1.PrismaClient {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('UsersService');
    }
    onModuleInit() {
        this.$connect();
        this.logger.log('Connected to DB');
    }
    getServiciosEnum() {
        let data = {
            serviciosRequeridos: []
        };
        data.serviciosRequeridos = Object.values(client_1.ServicioRequerido);
        return data;
    }
    async create(createFormularioDto) {
        try {
            return this.formulario.create({
                data: createFormularioDto
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async exists(id) {
        const product = await this.formulario.findFirst({
            where: { id }
        });
        console.log('findOne: ', product);
        if (!product) {
            throw new common_1.NotFoundException(`Formulario with id ${id} was not found`);
        }
        return product;
    }
    findAll() {
        try {
            return this.formulario.findMany();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async findOne(id) {
        const user = await this.formulario.findUnique({ where: { id } });
        try {
            if (!user) {
                throw new common_1.NotFoundException(`Formulario with ID ${id} not found`);
            }
            return user;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    update(id, updateFormularioDto) {
        try {
            return this.formulario.update({ where: { id }, data: updateFormularioDto });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async remove(id) {
        await this.findOne(id);
        const formulario = await this.formulario.update({
            where: { id },
            data: {
                available: false
            }
        });
        return formulario;
    }
    async updateAvailable(id) {
        const formularioToUpdate = await this.exists(id);
        if (!formularioToUpdate) {
            throw new common_1.NotFoundException('Product you want to update was not found');
        }
        return this.formulario.update({
            where: { id },
            data: {
                available: true
            }
        });
    }
};
exports.FormularioService = FormularioService = __decorate([
    (0, common_1.Injectable)()
], FormularioService);
//# sourceMappingURL=formulario.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
let UsersService = exports.UsersService = class UsersService extends client_1.PrismaClient {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('UsersService');
    }
    onModuleInit() {
        this.$connect();
        this.logger.log('Connected to DB');
    }
    getAll() {
        try {
            return this.usuario.findMany({
                where: { deleted: false },
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getOne(id) {
        const user = await this.usuario.findUnique({
            where: { id, deleted: false },
        });
        try {
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            return user;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async findByEmail(email) {
        const user = await this.usuario.findUnique({
            where: { email, deleted: false },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }
    async create(createUserDto) {
        try {
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            return this.usuario.create({
                data: {
                    ...createUserDto,
                    password: hashedPassword,
                },
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    update(id, updateUserDto) {
        try {
            return this.usuario.update({
                where: { id, deleted: false },
                data: updateUserDto,
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async delete(id) {
        try {
            const user = await this.usuario.update({
                where: { id },
                data: { deleted: true },
            });
            return user;
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map
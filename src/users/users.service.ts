import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger('UsersService');
    onModuleInit() {
        this.$connect();
        this.logger.log('Connected to DB');
    }

    getAll(){
        try {
            return this.usuario.findMany({
                where: { deleted: false },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getOne(id: number){
        const user = await this.usuario.findFirst({
            where: {
                id: id,
                deleted: false,
            },
        });
        try {
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findByEmail(email: string) {
        const user = await this.usuario.findUnique({
            where: { email, deleted: false },
        });
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    async create(createUserDto: CreateUserDto){
        try {
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            return this.usuario.create({
              data: {
                ...createUserDto,
                //password: hashedPassword,
              },
            });
            //return this.usuario.create({data: createUserDto});
        } catch (error) {
            throw new Error(error);
        }
    }

    update(id: number, updateUserDto: UpdateUserDto){
        try {
            return this.usuario.update({
                where: {
                    id: id,
                },
                data: updateUserDto,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id: number){
        try {
            const user = await this.usuario.update({
                where: { id },
                data: { deleted: true },
            });
            return user;
        } catch (error) {
            throw new Error(error);
        }      
    }

    async countUsers() {
        try {
            return await this.usuario.count({
                where: { deleted: false },
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

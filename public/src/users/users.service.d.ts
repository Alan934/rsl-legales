import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService extends PrismaClient implements OnModuleInit {
    private readonly logger;
    onModuleInit(): void;
    getAll(): any;
    getOne(id: number): Promise<any>;
    findByEmail(email: string): Promise<any>;
    create(createUserDto: CreateUserDto): Promise<any>;
    update(id: number, updateUserDto: UpdateUserDto): any;
    delete(id: number): Promise<any>;
}

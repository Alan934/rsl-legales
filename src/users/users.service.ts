import { HttpException, HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger('UsersService');
    private usersCountForDay: { date: string, value: number } = { date: '', value: 0 };
    private signaturesCountForDay: { date: string, value: number } = { date: '', value: 0 };
    private recordsCountForDay: { date: string, value: number } = { date: '', value: 0 };
  
    onModuleInit() {
        this.$connect();
        this.logger.log('Users Connected to DB');
    }

    getRandomNumber(): number {
      return Math.floor(Math.random() * 1000) + 1;
    }
    
    getAll(){
        try {
            return this.usuario.findMany({
                where: { deleted: false },
            });
        } catch (error) {
            throw new HttpException('Bad Request Get All', HttpStatus.BAD_REQUEST)
        }
    }

    async getOne(id: number){
        try {

            const user = await this.usuario.findFirst({
                where: {
                    id: id,
                    deleted: false,
                },
                select: {
                    nombre: true,
                    apellido: true,
                    edad: true,
                    email: true,
                    formularios:true
                }
            })

            if (!user) {
                throw new HttpException(`Error user with id #${id} not found`, HttpStatus.NOT_FOUND)
            }
            return {user};
        } catch (error) {
            throw new HttpException(`Error user with id #${id} not found`, HttpStatus.NOT_FOUND)
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

    async create(createUserDto: CreateUserDto) {
        try {
          let hashedPassword = '';
          
          if (createUserDto.password) {
            hashedPassword = await bcrypt.hash(createUserDto.password, 10);
          }
      
          return this.usuario.create({
            data: {
              ...createUserDto,
              password: hashedPassword || null, // Permitir que la contraseña sea null
            },
          });
        } catch (error) {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }      
    }

    async countUsers() {
        try {
            return await this.usuario.count({
                where: { deleted: false },
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

  // Obtener la fecha en formato YYYY-MM-DD
  private getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  async getUsersWithIncrement() {
    const today = this.getCurrentDate();
    if (this.usersCountForDay.date === today) {
      return this.usersCountForDay.value;
    }
    try {
      const userCount = await this.countUsers();
      const randomIncrement = Math.floor(Math.random() * 2) + 1;
      const baseUsers = 600;
      
      const incrementedUsers = baseUsers + userCount + randomIncrement;
      this.usersCountForDay = { date: today, value: incrementedUsers };
      return incrementedUsers;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getSignaturesCount() {
    const today = this.getCurrentDate();
    if (this.signaturesCountForDay.date === today) {
      return this.signaturesCountForDay.value;
    }
    try {
      const userCount = await this.countUsers();
      const randomIncrement = Math.floor(Math.random() * 2) + 2; 
      const baseSignatures = 700;

      const incrementedSignatures = baseSignatures + userCount + randomIncrement;
      this.signaturesCountForDay = { date: today, value: incrementedSignatures };
      return incrementedSignatures;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRecordsCount() {
    const today = this.getCurrentDate();
    if (this.recordsCountForDay.date === today) {
      return this.recordsCountForDay.value;
    }
    try {
      const userCount = await this.countUsers();
      const randomIncrement = Math.floor(Math.random() * 2) + 3;
      const baseRecords = 800;

      const incrementedRecords = baseRecords + userCount + randomIncrement;
      this.recordsCountForDay = { date: today, value: incrementedRecords };
      return incrementedRecords;
    } catch (error) {
      throw new Error(error);
    }
  }
}

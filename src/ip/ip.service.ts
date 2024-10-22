import { HttpException, HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { CreateIpDto } from './dto/create-ip.dto';
import { UpdateIpDto } from './dto/update-ip.dto';

@Injectable()
export class IpService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('IpService');
  onModuleInit() {
    this.$connect();
    this.logger.log('IP Connected to DB');
  }

  async create(createIpDto: CreateIpDto) {
    try {
      return await this.iPAddress.create({
        data: {
          ip: createIpDto.ip,
        },
      });
    } catch (error) {
      throw new Error(`Error al crear la IP: ${error.message}`);
    }
  }

  async getAllIps() {
    try {
      return await this.iPAddress.findMany({
        where: {
          deleted: false,
        },
      });
    } catch (error) {
      throw new Error(`Error al obtener las IPs: ${error.message}`);
    }
  }

  async getOne(id: number) {
    try {
      const ipFound = await this.iPAddress.findFirst({
        where: {
          id: id,
          deleted: false,
        },
      });
      if (!ipFound) {
        throw new NotFoundException(`IP "${id}" no encontrada.`);
      }
      return ipFound;
    } catch (error) {
      throw new Error(`Error al obtener la IP: ${error.message}`);
    }
  }

  async update(id: number, updateIpDto: UpdateIpDto) {
    try {
        return this.iPAddress.update({
            where: {
                id: id,
            },
            data: updateIpDto,
        });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
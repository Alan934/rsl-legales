import { HttpException, HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class IpService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger('IpService');
    onModuleInit() {
      this.$connect();
      this.logger.log('IP Connected to DB');
    }

    async saveIp(ip: string) {
        try {
          return await this.iPAddress.create({
            data: {
              ip: ip,
            },
          });
        } catch (error) {
          throw new Error(`Error al guardar la IP: ${error.message}`);
        }
      }
    
      async getAllIps() {
        try {
          return await this.iPAddress.findMany();
        } catch (error) {
          throw new Error(`Error al obtener las IPs: ${error.message}`);
        }
      }

}
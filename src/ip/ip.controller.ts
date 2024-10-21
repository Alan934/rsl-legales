import { Controller, Post, Body, Logger, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { IpService } from './ip.service';

@ApiTags('Ips')
@Controller('ip')
export class IpController {
    private readonly logger = new Logger('IpController');

    constructor(private readonly ipService: IpService) {}

    @Post()
    async saveIp(@Req() req: Request, @Body() body: { ip?: string }) {
      let ip = body.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      // Si x-forwarded-for es un array, toma la primera IP (la más cercana al cliente)
      if (Array.isArray(ip)) {
        ip = ip[0];
      }
      
      if (!ip) {
        throw new Error('IP is required');
      }

      this.logger.log(`Guardando IP: ${ip}`);
      await this.ipService.saveIp(ip);
      return { message: 'IP guardada correctamente' };
    }
}

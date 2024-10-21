import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards';
import { ApiTags } from '@nestjs/swagger';
import { IpService } from './ip.service';

@ApiTags('Ips')
@Controller('ip')
export class IpController {
    constructor(private readonly ipService: IpService) {}

    @Post()
    async saveIp(@Body() body: { ip: string }) {
      const { ip } = body;
  
      if (!ip) {
        throw new Error('IP is required');
      }
  
      await this.ipService.saveIp(ip);
      return { message: 'IP guardada correctamente' };
    }

}
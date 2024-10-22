import { Controller, Post, Body, Logger, Req, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { IpService } from './ip.service';
import { CreateIpDto } from './dto/create-ip.dto';
import { AuthGuard } from 'src/auth/guards';

@ApiTags('Ips')
@Controller('ip')
export class IpController {
  private readonly logger = new Logger('IpController');

  constructor(private readonly ipService: IpService) {}

  @Post()
  async create(@Req() req: Request, @Body() createIpDto: CreateIpDto) {
    try {
      let ip = createIpDto.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      // Si es un array, tomamos la primera
      if (Array.isArray(ip)) {
        ip = ip[0];
      }
      if (!ip) {
        throw new Error('IP no encontrada');
      }
      return await this.ipService.create({ ip });
    } catch (error) {
      this.logger.error(`Error al crear la IP: ${error.message}`);
      throw new Error(`Error al crear la IP: ${error.message}`);
    }
  }
  
  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    try {
      return await this.ipService.getAllIps();
    } catch (error) {
      throw new Error(`Error al obtener las IPs: ${error.message}`);
    }
  }
  
  @UseGuards(AuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: number) {
    try {
      return await this.ipService.getOne(Number(id));
    } catch (error) {
      throw new Error(`Error al obtener la IP: ${error.message}`);
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateIpDto: CreateIpDto) {
    return this.ipService.update(Number(id), updateIpDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.ipService.delete(Number(id));
  }

}

import { Controller, Post, Body, Logger, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IpService } from './ip.service';

@ApiTags('Ips')
@Controller('ip')
export class IpController {
    private readonly logger = new Logger('IpController');

    constructor(private readonly ipService: IpService) {}

    @Post()
    async saveIp(@Body() body: { ip: string }) {
        const { ip } = body;

        if (!ip) {
            this.logger.error('No IP provided in the request body');
            throw new BadRequestException('IP is required');
        }

        try {
            this.logger.log(`Saving IP: ${ip}`);
            await this.ipService.saveIp(ip);
            return { message: 'IP guardada correctamente' };
        } catch (error) {
            this.logger.error(`Error al guardar la IP: ${error.message}`);
            throw new BadRequestException(`Error al guardar la IP: ${error.message}`);
        }
    }
}
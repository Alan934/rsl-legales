import { Module } from '@nestjs/common';
import { IpService } from './ip.service';
import { IpController } from './ip.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  controllers: [IpController],
  providers: [IpService, AuthService, JwtService],
  exports: [IpService],
})
export class IpModule {}
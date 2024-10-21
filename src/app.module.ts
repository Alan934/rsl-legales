import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FormularioModule } from './formulario/formulario.module';
import { IpModule } from './ip/ip.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, FormularioModule, IpModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

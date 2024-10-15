import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FormularioModule } from './formulario/formulario.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, FormularioModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

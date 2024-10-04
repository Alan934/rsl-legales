import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FormularioModule } from './formulario/formulario.module';

@Module({
  imports: [UsersModule, FormularioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

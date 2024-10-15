import { Module } from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { FormularioController } from './formulario.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [UsersModule],
  controllers: [FormularioController],
  providers: [FormularioService, AuthService],
})
export class FormularioModule {}

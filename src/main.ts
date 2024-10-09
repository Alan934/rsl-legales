import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',  // Permitir todas las solicitudes
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',  // Añadir OPTIONS para pre-flight
    allowedHeaders: 'Content-Type, Accept, Authorization',  // Permitir encabezados adicionales si es necesario
    credentials: true,  // Habilitar si necesitas enviar cookies
  });
  app.setGlobalPrefix('api');

  await app.listen(envs.port);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger('bootstrap');
  
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, 
  });
  
  const config = new DocumentBuilder()
   .setTitle('RSL Legales Backend')
   .setDescription('API para el manejo de formularios y usuarios')
   .setVersion('1.7')
   .addTag('RST Legales')
   .build();

  const document = SwaggerModule.createDocument(app, config);
  
  
  app.setGlobalPrefix('api');

  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
  );

  await app.listen(envs.port);
  logger.log(`Application listening on port ${envs.port}`);
}
bootstrap();

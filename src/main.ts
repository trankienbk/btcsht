import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import 'reflect-metadata';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  console.log(
    `Environment ${
      process.env.NODE_ENV || 'development'
    } - Bao tri co so ha tang service is running`,
  );
}
bootstrap();

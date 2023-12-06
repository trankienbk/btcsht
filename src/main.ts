import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false, // set true to hide detailed error message
      whitelist: false, // set true to strip params which are not in DTO
      transform: false, // set true if you want DTO to convert params to DTO class by default its false
    }),
  );
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT' as never);
  const config = new DocumentBuilder()
    .setTitle('Phần mềm giao thông công cộng')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' }, 'Token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
  console.log(
    `Environment ${
      process.env.NODE_ENV || 'development'
    } - Server is running at port ${PORT || 3100}`,
  );
}
bootstrap();

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ViTriController } from './controller/vi-tri.controller';
import { ViTriService } from './service/vi-tri.service';

@Module({
  imports: [JwtModule],
  controllers: [ViTriController],
  providers: [
    ViTriService,
    {
      provide: 'MS_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
          },
        }),
    },
  ],
  exports: [ViTriService],
})
export class ViTriModule {}

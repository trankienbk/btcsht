import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { NhaDieuHanhController } from './controller/nha-dieu-hanh.controller';
import { NhaDieuHanhService } from './service/nha-dieu-hanh.service';

@Module({
  imports: [JwtModule],
  controllers: [NhaDieuHanhController],
  providers: [
    NhaDieuHanhService,
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
  exports: [NhaDieuHanhService],
})
export class NhaDieuHanhModule {}

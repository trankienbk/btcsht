import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { HeThongChieuSangController } from './controller/he-thong-chieu-sang.controller';
import { HeThongChieuSangService } from './service/he-thong-chieu-sang.service';

@Module({
  imports: [JwtModule],
  controllers: [HeThongChieuSangController],
  providers: [
    HeThongChieuSangService,
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
  exports: [HeThongChieuSangService],
})
export class HeThongChieuSangModule {}

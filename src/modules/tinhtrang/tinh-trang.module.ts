import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TinhTrangController } from './controller/tinh-trang.controller';
import { TinhTrangService } from './service/tinh-trang.service';
import { LoaiTinhTrangController } from './controller/loai-tinh-trang.controller';
import { LoaiTinhTrangService } from './service/loai-tinh-trang.service';

@Module({
  imports: [JwtModule],
  controllers: [TinhTrangController, LoaiTinhTrangController],
  providers: [
    TinhTrangService,
    LoaiTinhTrangService,
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
  exports: [TinhTrangService, LoaiTinhTrangService],
})
export class TinhTrangModule {}

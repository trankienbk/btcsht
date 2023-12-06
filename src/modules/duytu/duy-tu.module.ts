import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { DanhMucDuyTuController } from './controller/loai-duy-tu.controller';
import { LoaiDuyTuService } from './service/loai-duy-tu.service';

@Module({
  imports: [JwtModule],
  controllers: [DanhMucDuyTuController],
  providers: [
    LoaiDuyTuService,
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
  exports: [LoaiDuyTuService],
})
export class DuyTuModule {}

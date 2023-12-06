import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { DanhMucTuyenBusController } from './controller/danh-muc-tuyen-bus.controller';
import { DanhMucTuyenBusService } from './service/danh-muc-tuyen-bus.service';

@Module({
  imports: [JwtModule],
  controllers: [DanhMucTuyenBusController],
  providers: [
    DanhMucTuyenBusService,
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
  exports: [DanhMucTuyenBusService],
})
export class DanhMucTuyenBusModule {}

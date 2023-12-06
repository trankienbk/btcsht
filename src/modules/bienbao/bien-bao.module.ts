import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { DanhMucBienBaoController } from './controller/danh-muc-bien-bao.controller';
import { DanhMucBienBaoService } from './service/danh-muc-bien-bao.service';
import { BienBaoController } from './controller/bien-bao.controller';
import { BienBaoService } from './service/bien-bao.service';

@Module({
  imports: [JwtModule],
  controllers: [DanhMucBienBaoController, BienBaoController],
  providers: [
    DanhMucBienBaoService,
    BienBaoService,
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
  exports: [DanhMucBienBaoService, BienBaoService],
})
export class BienBaoModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { DanhMucDiemDungController } from './controller/loai-diem-dung.controller';
import { DanhMucDiemDungService } from './service/loai-diem-dung.service';
import { DiemDungController } from './controller/diem-dung.controller';
import { DiemDungService } from './service/diem-dung.service';
import { DuyTuDiemDungController } from './controller/duy-tu-diem-dung.controller';
import { DuyTuDiemDungService } from './service/duy-tu-diem-dung.service';

@Module({
  imports: [JwtModule],
  controllers: [
    DuyTuDiemDungController,
    DanhMucDiemDungController,
    DiemDungController,
  ],
  providers: [
    DanhMucDiemDungService,
    DuyTuDiemDungService,
    DiemDungService,
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
  exports: [DanhMucDiemDungService, DiemDungService, DuyTuDiemDungService],
})
export class DiemDungModule {}

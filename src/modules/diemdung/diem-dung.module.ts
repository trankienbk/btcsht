import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoaiDiemDungController } from './controller/loai-diem-dung.controller';
import { DanhMucDiemDungService } from './service/loai-diem-dung.service';
import { LoaiDiemDungCauHinhEntity } from './entities/loai-diem-dung-cau-hinh.entity';
import { LoaiDiemDungEntity } from './entities/loai-diem-dung.entity';
import { LoaiDoiTuongEntity } from './entities/loai-doi-tuong.entity';
import { LoaiDoiTuongController } from './controller/loai-doi-tuong.controller';
import { DanhMucDoiTuongService } from './service/loai-doi-tuong.service';
import { LoaiDiemDungCauHinhController } from './controller/loai-diem-dung-cau-hinh.controller';
import { DanhMucDiemDungCauHinhService } from './service/loai-diem-dung-cau-hinh.service';
import { DiemDungController } from './controller/diem-dung.controller';
import { DiemDungService } from './service/diem-dung.service';
import { DiemDungEntity } from './entities/diem-dung.entity';
import { DuyTuDiemDungEntity } from './entities/duy-tu-diem-dung.entity';
import { DuyTuDiemDungController } from './controller/duy-tu-diem-dung.controller';
import { DuyTuDiemDungService } from './service/duy-tu-diem-dung.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TinhTrangEntity } from '../tinhtrang/entities/tinh-trang.entity';
import { DanhMucDuyTuEntity } from '../duytu/entities/danh-muc-duy-tu.entity';
import { DuongModule } from '../duong/duong.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LoaiDiemDungEntity,
      LoaiDoiTuongEntity,
      LoaiDiemDungCauHinhEntity,
      DiemDungEntity,
      DuyTuDiemDungEntity,
      TinhTrangEntity,
      DanhMucDuyTuEntity,
    ]),
    DuongModule,
  ],
  controllers: [
    LoaiDiemDungController,
    LoaiDoiTuongController,
    LoaiDiemDungCauHinhController,
    DiemDungController,
    DuyTuDiemDungController,
  ],
  providers: [
    DanhMucDiemDungService,
    DanhMucDoiTuongService,
    DanhMucDiemDungCauHinhService,
    DiemDungService,
    DuyTuDiemDungService,
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
  exports: [
    DanhMucDiemDungService,
    DanhMucDoiTuongService,
    DanhMucDiemDungCauHinhService,
    DiemDungService,
    DuyTuDiemDungService,
  ],
})
export class DiemDungModule {}

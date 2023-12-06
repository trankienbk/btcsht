import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanhMucPanoController } from './controller/danh-muc-pano.controller';
import { DanhMucPanoService } from './service/danh-muc-pano.service';
import { DanhMucPanoEntity } from './entities/danh-muc-pano.entity';
import { PanoService } from './service/pano.service';
import { PanoController } from './controller/pano.controller';
import { PanoEntity } from './entities/pano.entity';
import { TinhTrangEntity } from '../tinhtrang/entities/tinh-trang.entity';
import { DanhMucDuyTuEntity } from '../duytu/entities/danh-muc-duy-tu.entity';
import { DiemDungEntity } from '../diemdung/entities/diem-dung.entity';
import { DuyTuPanoEntity } from './entities/duy-tu-pano.entity';
import { DuyTuPanoController } from './controller/duy-tu-pano.controller';
import { DuyTuPanoService } from './service/duy-tu-pano.service';
import { ThanhPhanEntity } from '../bando/thanhphan/entities/thanh-phan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DanhMucPanoEntity,
      PanoEntity,
      TinhTrangEntity,
      DanhMucPanoEntity,
      DanhMucDuyTuEntity,
      DiemDungEntity,
      DuyTuPanoEntity,
      ThanhPhanEntity,
    ]),
  ],
  controllers: [DanhMucPanoController, PanoController, DuyTuPanoController],
  providers: [DanhMucPanoService, PanoService, DuyTuPanoService],
  exports: [DanhMucPanoService, PanoService, DuyTuPanoService],
})
export class PanoModule {}

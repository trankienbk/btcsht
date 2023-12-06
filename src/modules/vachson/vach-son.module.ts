import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanhMucVachSonController } from './controller/danh-muc-vach-son.controller';
import { DanhMucVachSonService } from './service/danh-muc-vach-son.service';
import { DanhMucVachSonEntity } from './entities/danh-muc-vach-son.entity';
import { VachSonService } from './service/vach-son.service';
import { VachSonController } from './controller/vach-son.controller';
import { VachSonEntity } from './entities/vach-son.entity';
import { TinhTrangEntity } from '../tinhtrang/entities/tinh-trang.entity';
import { DanhMucDuyTuEntity } from '../duytu/entities/danh-muc-duy-tu.entity';
import { DiemDungEntity } from '../diemdung/entities/diem-dung.entity';
import { DuyTuVachSonEntity } from './entities/duy-tu-vach-son.entity';
import { DuyTuVachSonController } from './controller/duy-tu-vach-son.controller';
import { DuyTuVachSonService } from './service/duy-tu-vach-son.service';
import { ThanhPhanEntity } from '../bando/thanhphan/entities/thanh-phan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DanhMucVachSonEntity,
      VachSonEntity,
      TinhTrangEntity,
      DanhMucVachSonEntity,
      DanhMucDuyTuEntity,
      DiemDungEntity,
      DuyTuVachSonEntity,
      ThanhPhanEntity,
    ]),
  ],
  controllers: [
    DanhMucVachSonController,
    VachSonController,
    DuyTuVachSonController,
  ],
  providers: [DanhMucVachSonService, VachSonService, DuyTuVachSonService],
  exports: [DanhMucVachSonService, VachSonService, DuyTuVachSonService],
})
export class VachSonModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TinhTrangDoiTuongController } from './controller/tinh-trang.controller';
import { TinhTrangService } from './service/tinh-trang.service';
import { TinhTrangEntity } from './entities/tinh-trang.entity';
import { LoaiTinhTrangEntity } from './entities/loai-tinh-trang.entity';
import { LoaiTinhTrangDoiTuongController } from './controller/loai-tinh-trang.controller';
import { LoaiTinhTrangService } from './service/loai-tinh-trang.service';

@Module({
  imports: [TypeOrmModule.forFeature([TinhTrangEntity, LoaiTinhTrangEntity])],
  controllers: [TinhTrangDoiTuongController, LoaiTinhTrangDoiTuongController],
  providers: [TinhTrangService, LoaiTinhTrangService],
  exports: [TinhTrangService, LoaiTinhTrangService],
})
export class TinhTrangModule {}

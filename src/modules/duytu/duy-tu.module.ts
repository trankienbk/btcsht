import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanhMucDuyTuController } from './controller/danh-muc-duy-tu.controller';
import { DanhMucDuyTuService } from './service/danh-muc-duy-tu.service';
import { DanhMucDuyTuEntity } from './entities/danh-muc-duy-tu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DanhMucDuyTuEntity])],
  controllers: [DanhMucDuyTuController],
  providers: [DanhMucDuyTuService],
  exports: [DanhMucDuyTuService],
})
export class DuyTuModule {}

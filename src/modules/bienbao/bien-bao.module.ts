import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanhMucBienBaoController } from './controller/danh-muc-bien-bao.controller';
import { DanhMucBienBaoService } from './service/danh-muc-bien-bao.service';
import { DanhMucBienBaoEntity } from './entities/danh-muc-bien-bao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DanhMucBienBaoEntity])],
  controllers: [DanhMucBienBaoController],
  providers: [DanhMucBienBaoService],
  exports: [DanhMucBienBaoService],
})
export class BienBaoModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanhMucTuyenBusController } from './controller/danh-muc-tuyen-bus.controller';
import { DanhMucTuyenBusService } from './service/danh-muc-tuyen-bus.service';
import { DanhMucTuyenBusEntity } from './entities/danh-muc-tuyen-bus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DanhMucTuyenBusEntity])],
  controllers: [DanhMucTuyenBusController],
  providers: [DanhMucTuyenBusService],
  exports: [DanhMucTuyenBusService],
})
export class TuyenBusModule {}

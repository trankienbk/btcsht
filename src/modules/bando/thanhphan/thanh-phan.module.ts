import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThanhPhanConTroller } from './controller/thanh-phan.controller';
import { ThanhPhanService } from './service/thanh-phan.service';
import { ThanhPhanEntity } from './entities/thanh-phan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ThanhPhanEntity])],
  controllers: [ThanhPhanConTroller],
  providers: [ThanhPhanService],
  exports: [ThanhPhanService],
})
export class ThanhPhanModule {}

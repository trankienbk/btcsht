import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { viTriConTroller } from './controller/vi-tri.controller';
import { ViTriService } from './service/vi-tri.service';
import { ViTriEntity } from './entities/vi-tri.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ViTriEntity])],
  controllers: [viTriConTroller],
  providers: [ViTriService],
  exports: [ViTriService],
})
export class ViTriModule {}

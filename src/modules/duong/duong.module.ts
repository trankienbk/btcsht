import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DuongController } from './controller/duong.controller';
import { DuongService } from './services/duong.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    HttpModule.register({
      timeout: 100000,
    }),
  ],
  controllers: [DuongController],
  providers: [DuongService],
  exports: [DuongService],
})
export class DuongModule {}

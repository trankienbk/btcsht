import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { dataSourceOptions } from './config/data-source.config';
import { AppController } from './app.controller';
import { DiemDungModule } from './modules/diemdung/diem-dung.module';
import { DuyTuModule } from './modules/duytu/duy-tu.module';
import { TuyenBusModule } from './modules/tuyenbus/tuyen-bus.module';
import { VachSonModule } from './modules/vachson/vach-son.module';
import { NhaChoModule } from './modules/nhacho/nha-cho.module';
import { BienBaoModule } from './modules/bienbao/bien-bao.module';
import { TinhTrangModule } from './modules/tinhtrang/tinh-trang.module';
import { ViTriModule } from './modules/bando/vitri/vi-tri.module';
import { CayXanhModule } from './modules/cayxanh/cay-xanh.module';
import { HangRaoModule } from './modules/hangrao/hang-rao.module';
import { HeNoiBoModule } from './modules/henoibo/he-noi-bo.module';
import { VinhXeBusModule } from './modules/vinhxebus/vinh-xe-bus.module';
import { DuongNoiBoModule } from './modules/duongnoibo/duong-noi-bo.module';
import { NhaVeSinhModule } from './modules/nhavesinh/nha-ve-sinh.module';
import { HeThongChieuSangModule } from './modules/hethongchieusang/he-thong-chieu-sang.module';
import { BienChiDanModule } from './modules/bienchidan/bien-chi-dan.module';
import { NhaDieuHanhModule } from './modules/nhadieuhanh/nha-dieu-hanh.module';
import { DuongModule } from './modules/duong/duong.module';
import { ThanhPhanModule } from './modules/bando/thanhphan/thanh-phan.module';
import { PanoModule } from './modules/pano/pano.module';
@Module({
  imports: [
    DiemDungModule,
    DuyTuModule,
    TuyenBusModule,
    VachSonModule,
    NhaChoModule,
    BienBaoModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.${process.env.NODE_ENV}.env`],
    }),
    CacheModule.register({
      isGlobal: true,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      store: redisStore,
    }),
    TinhTrangModule,
    ViTriModule,
    CayXanhModule,
    HangRaoModule,
    HeNoiBoModule,
    VinhXeBusModule,
    DuongNoiBoModule,
    NhaVeSinhModule,
    HeThongChieuSangModule,
    BienChiDanModule,
    NhaDieuHanhModule,
    DuongModule,
    ThanhPhanModule,
    PanoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

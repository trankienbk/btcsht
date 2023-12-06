import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import {
  dataSourceOptions,
  mongodbDataSourceOptions,
} from './config/data-source.config';
import { DonviModule } from './modules/donvi/donvi.module';
import { AccountModule } from './modules/sys/account/account.module';
import { AuthModule } from './modules/sys/auth/auth.module';
import { PermissionModule } from './modules/sys/permision/permission.module';
import { LogModule } from './modules/log/log.module';
import { MONGO_DB_CONNECTION } from './common/constants/db.constants';
import { DistrictModule } from './modules/district/district.module';
import { DuyTuModule } from './modules/duytu/duy-tu.module';
import { DiemDungModule } from './modules/diemdung/diem-dung.module';
import { DanhMucTuyenBusModule } from './modules/tuyenbus/danh-muc-tuyen-bus.module';
import { DanhMucVachSonModule } from './modules/vachson/danh-muc-vach-son.module';
import { NhaChoModule } from './modules/nhacho/nha-cho.module';
import { BienBaoModule } from './modules/bienbao/bien-bao.module';
import { TinhTrangModule } from './modules/tinhtrang/tinh-trang.module';
import { ViTriModule } from './modules/vitri/vi-tri.module';
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
import { ThanhPhanModule } from './modules/thanhphan/thanh-phan.module';
import { PanoModule } from './modules/pano/pano.module';
import { S3Module } from './modules/s3/s3.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => dataSourceOptions,
    }),
    TypeOrmModule.forRootAsync({
      name: MONGO_DB_CONNECTION,
      useFactory: async () => mongodbDataSourceOptions,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.${process.env.NODE_ENV}.env`],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        store: redisStore,
      }),
    }),
    LogModule,
    AuthModule,
    AccountModule,
    DonviModule,
    PermissionModule,
    DistrictModule,
    DuyTuModule,
    DiemDungModule,
    DanhMucTuyenBusModule,
    DanhMucVachSonModule,
    NhaChoModule,
    BienBaoModule,
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
    S3Module,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'MS_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
          },
        }),
    },
  ],
})
export class AppModule {}

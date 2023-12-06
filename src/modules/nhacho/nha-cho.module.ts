import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanhMucNhaChoController } from './controller/danh-muc-nha-cho.controller';
import { DanhMucNhaChoService } from './service/danh-muc-nha-cho.service';
import { DanhMucNhaChoEntity } from './entities/danh-muc-nha-cho.entity';
import { NhaChoEntity } from './entities/nha-cho.entity';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { NhaChoService } from './service/nha-cho.service';
import { NhaChoController } from './controller/nha-cho.controller';
import { TinhTrangEntity } from '../tinhtrang/entities/tinh-trang.entity';
import { DiemDungEntity } from '../diemdung/entities/diem-dung.entity';
import { DanhMucDuyTuEntity } from '../duytu/entities/danh-muc-duy-tu.entity';
import { DuyTuNhaChoEntity } from './entities/duy-tu-nha-cho.entity';
import { DuyTuNhaChoService } from './service/duy-tu-nha-cho.service';
import { DuyTuNhaChoController } from './controller/duy-tu-nha-cho.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DanhMucNhaChoEntity,
      NhaChoEntity,
      TinhTrangEntity,
      DiemDungEntity,
      DanhMucDuyTuEntity,
      DuyTuNhaChoEntity,
    ]),
  ],
  controllers: [
    DanhMucNhaChoController,
    NhaChoController,
    DuyTuNhaChoController,
  ],
  providers: [
    DanhMucNhaChoService,
    NhaChoService,
    DuyTuNhaChoService,
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
  exports: [DanhMucNhaChoService, NhaChoService, DuyTuNhaChoService],
})
export class NhaChoModule {}

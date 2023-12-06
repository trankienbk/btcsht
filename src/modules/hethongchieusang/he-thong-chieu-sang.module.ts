import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { HeThongChieuSangController } from './controller/he-thong-chieu-sang.controller';
import { HeThongChieuSangEntity } from './entities/he-thong-chieu-sang.entity';
import { HeThongChieuSangService } from './service/he-thong-chieu-sang.service';
import { DiemDungEntity } from '../diemdung/entities/diem-dung.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HeThongChieuSangEntity, DiemDungEntity])],
  controllers: [HeThongChieuSangController],
  providers: [
    HeThongChieuSangService,
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
  exports: [HeThongChieuSangService],
})
export class HeThongChieuSangModule {}

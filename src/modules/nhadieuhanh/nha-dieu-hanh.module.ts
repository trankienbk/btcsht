import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { NhaDieuHanhController } from './controller/nha-dieu-hanh.controller';
import { NhaDieuHanhEntity } from './entities/nha-dieu-hanh.entity';
import { NhaDieuHanhService } from './service/nha-dieu-hanh.service';
import { DiemDungEntity } from '../diemdung/entities/diem-dung.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NhaDieuHanhEntity, DiemDungEntity])],
  controllers: [NhaDieuHanhController],
  providers: [
    NhaDieuHanhService,
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
  exports: [NhaDieuHanhService],
})
export class NhaDieuHanhModule {}

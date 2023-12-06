import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { DuongNoiBoController } from './controller/duong-noi-bo.controller';
import { DuongNoiBoEntity } from './entities/duong-noi-bo.entity';
import { DuongNoiBoService } from './service/duong-noi-bo.service';
import { DiemDungEntity } from '../diemdung/entities/diem-dung.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DuongNoiBoEntity, DiemDungEntity])],
  controllers: [DuongNoiBoController],
  providers: [
    DuongNoiBoService,
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
  exports: [DuongNoiBoService],
})
export class DuongNoiBoModule {}

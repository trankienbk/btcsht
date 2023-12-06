import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { BienChiDanController } from './controller/bien-chi-dan.controller';
import { BienChiDanEntity } from './entities/bien-chi-dan.entity';
import { BienChiDanService } from './service/bien-chi-dan.service';
import { DiemDungEntity } from '../diemdung/entities/diem-dung.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BienChiDanEntity, DiemDungEntity])],
  controllers: [BienChiDanController],
  providers: [
    BienChiDanService,
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
  exports: [BienChiDanService],
})
export class BienChiDanModule {}

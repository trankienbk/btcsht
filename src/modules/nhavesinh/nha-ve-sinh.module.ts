import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { NhaVeSinhController } from './controller/nha-ve-sinh.controller';
import { NhaVeSinhEntity } from './entities/nha-ve-sinh.entity';
import { NhaVeSinhService } from './service/nha-ve-sinh.service';
import { DiemDungEntity } from '../diemdung/entities/diem-dung.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NhaVeSinhEntity, DiemDungEntity])],
  controllers: [NhaVeSinhController],
  providers: [
    NhaVeSinhService,
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
  exports: [NhaVeSinhService],
})
export class NhaVeSinhModule {}

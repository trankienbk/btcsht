import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { VinhXeBusController } from './controller/vinh-xe-bus.controller';
import { VinhXeBusEntity } from './entities/vinh-xe-bus.entity';
import { VinhXeBusService } from './service/vinh-xe-bus.service';
import { DiemDungEntity } from '../diemdung/entities/diem-dung.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VinhXeBusEntity, DiemDungEntity])],
  controllers: [VinhXeBusController],
  providers: [
    VinhXeBusService,
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
  exports: [VinhXeBusService],
})
export class VinhXeBusModule {}

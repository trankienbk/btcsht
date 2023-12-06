import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { HangRaoController } from './controller/hang-rao.controller';
import { HangRaoEntity } from './entities/hang-rao.entity';
import { HangRaoService } from './service/hang-rao.service';
import { DiemDungEntity } from '../diemdung/entities/diem-dung.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HangRaoEntity, DiemDungEntity])],
  controllers: [HangRaoController],
  providers: [
    HangRaoService,
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
  exports: [HangRaoService],
})
export class HangRaoModule {}

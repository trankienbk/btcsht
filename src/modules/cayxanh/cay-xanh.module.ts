import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CayXanhController } from './controller/cay-xanh.controller';
import { CayXanhEntity } from './entities/cay-xanh.entity';
import { CayXanhService } from './service/cay-xanh.service';
import { DiemDungEntity } from '../diemdung/entities/diem-dung.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CayXanhEntity, DiemDungEntity])],
  controllers: [CayXanhController],
  providers: [
    CayXanhService,
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
  exports: [CayXanhService],
})
export class CayXanhModule {}

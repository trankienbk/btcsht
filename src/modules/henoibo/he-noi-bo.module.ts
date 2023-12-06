import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { HeNoiBoController } from './controller/he-noi-bo.controller';
import { HeNoiBoEntity } from './entities/he-noi-bo.entity';
import { HeNoiBoService } from './service/he-noi-bo.service';
import { DiemDungEntity } from '../diemdung/entities/diem-dung.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HeNoiBoEntity, DiemDungEntity])],
  controllers: [HeNoiBoController],
  providers: [
    HeNoiBoService,
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
  exports: [HeNoiBoService],
})
export class HeNoiBoModule {}

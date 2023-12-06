import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { DanhMucNhaChoController } from './controller/danh-muc-nha-cho.controller';
import { DanhMucNhaChoService } from './service/danh-muc-nha-cho.service';
import { NhaChoController } from './controller/nha-cho.controller';
import { NhaChoService } from './service/nha-cho.service';
import { DuyTuNhaChoController } from './controller/duy-tu-nha-cho.controller';
import { DuyTuNhaChoService } from './service/duy-tu-nha-cho.service';

@Module({
  imports: [JwtModule],
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

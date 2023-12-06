import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { DanhMucPanoController } from './controller/danh-muc-pano.controller';
import { DanhMucPanoService } from './service/danh-muc-pano.service';
import { PanoController } from './controller/pano.controller';
import { PanoService } from './service/pano.service';
import { DuyTuPanoController } from './controller/duy-tu-pano.controller';
import { DuyTuPanoService } from './service/duy-tu-pano.service';

@Module({
  imports: [JwtModule],
  controllers: [DanhMucPanoController, PanoController, DuyTuPanoController],
  providers: [
    DanhMucPanoService,
    PanoService,
    DuyTuPanoService,
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
  exports: [DanhMucPanoService, PanoService, DuyTuPanoService],
})
export class PanoModule {}

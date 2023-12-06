import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { DanhMucVachSonController } from './controller/danh-muc-vach-son.controller';
import { DanhMucVachSonService } from './service/danh-muc-vach-son.service';
import { VachSonController } from './controller/vach-son.controller';
import { VachSonService } from './service/vach-son.service';
import { DuyTuVachSonController } from './controller/duy-tu-vach-son.controller';
import { DuyTuVachSonService } from './service/duy-tu-vach-son.service';

@Module({
  imports: [JwtModule],
  controllers: [
    DanhMucVachSonController,
    VachSonController,
    DuyTuVachSonController,
  ],
  providers: [
    DanhMucVachSonService,
    VachSonService,
    DuyTuVachSonService,
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
  exports: [DanhMucVachSonService, VachSonService, DuyTuVachSonService],
})
export class DanhMucVachSonModule {}

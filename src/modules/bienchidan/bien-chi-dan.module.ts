import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { BienChiDanController } from './controller/bien-chi-dan.controller';
import { BienChiDanService } from './service/bien-chi-dan.service';

@Module({
  imports: [JwtModule],
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

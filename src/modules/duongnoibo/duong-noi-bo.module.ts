import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { DuongNoiBoController } from './controller/duong-noi-bo.controller';
import { DuongNoiBoService } from './service/duong-noi-bo.service';

@Module({
  imports: [JwtModule],
  controllers: [DuongNoiBoController],
  providers: [
    DuongNoiBoService,
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
  exports: [DuongNoiBoService],
})
export class DuongNoiBoModule {}

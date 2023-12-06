import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { DuongController } from './controller/duong.controller';
import { DuongService } from './service/duong.service';

@Module({
  imports: [JwtModule],
  controllers: [DuongController],
  providers: [
    DuongService,
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
  exports: [DuongService],
})
export class DuongModule {}

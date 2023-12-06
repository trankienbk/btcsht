import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { NhaVeSinhController } from './controller/nha-ve-sinh.controller';
import { NhaVeSinhService } from './service/nha-ve-sinh.service';

@Module({
  imports: [JwtModule],
  controllers: [NhaVeSinhController],
  providers: [
    NhaVeSinhService,
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
  exports: [NhaVeSinhService],
})
export class NhaVeSinhModule {}

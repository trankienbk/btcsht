import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { VinhXeBusController } from './controller/vinh-xe-bus.controller';
import { VinhXeBusService } from './service/vinh-xe-bus.service';

@Module({
  imports: [JwtModule],
  controllers: [VinhXeBusController],
  providers: [
    VinhXeBusService,
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
  exports: [VinhXeBusService],
})
export class VinhXeBusModule {}

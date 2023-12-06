import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ThanhPhanController } from './controller/thanh-phan.controller';
import { ThanhPhanService } from './service/thanh-phan.service';

@Module({
  imports: [JwtModule],
  controllers: [ThanhPhanController],
  providers: [
    ThanhPhanService,
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
  exports: [ThanhPhanService],
})
export class ThanhPhanModule {}

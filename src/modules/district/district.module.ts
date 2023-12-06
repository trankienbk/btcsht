import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { DistrictController } from './controller/district.controller';
import { DistrictService } from './service/district.service';

@Module({
  imports: [JwtModule],
  controllers: [DistrictController],
  providers: [
    DistrictService,
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
  exports: [DistrictService],
})
export class DistrictModule {}

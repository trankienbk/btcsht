import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CayXanhController } from './controller/cay-xanh.controller';
import { CayXanhService } from './service/cay-xanh.service';

@Module({
  imports: [JwtModule],
  controllers: [CayXanhController],
  providers: [
    CayXanhService,
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
  exports: [CayXanhService],
})
export class CayXanhModule {}

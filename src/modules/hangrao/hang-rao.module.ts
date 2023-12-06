import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { HangRaoController } from './controller/hang-rao.controller';
import { HangRaoService } from './service/hang-rao.service';

@Module({
  imports: [JwtModule],
  controllers: [HangRaoController],
  providers: [
    HangRaoService,
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
  exports: [HangRaoService],
})
export class HangRaoModule {}

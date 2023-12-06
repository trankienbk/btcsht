import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { HeNoiBoController } from './controller/he-noi-bo.controller';
import { HeNoiBoService } from './service/he-noi-bo.service';

@Module({
  imports: [JwtModule],
  controllers: [HeNoiBoController],
  providers: [
    HeNoiBoService,
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
  exports: [HeNoiBoService],
})
export class HeNoiBoModule {}

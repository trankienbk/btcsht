import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AccountController } from './controller/account.controller';
import { AccountService } from './service/account.service';

@Module({
  imports: [JwtModule],
  controllers: [AccountController],
  providers: [
    AccountService,
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
  exports: [AccountService],
})
export class AccountModule {}

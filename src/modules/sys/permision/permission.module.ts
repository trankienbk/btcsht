import { Module } from '@nestjs/common';
import { RoleController } from './controller/role.controller';
import { RoleService } from './service/role.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { PermissionController } from './controller/permission.controller';
import { PermissionService } from './service/permission.service';
import { RolePermissionController } from './controller/role-permission.controller';
import { RolePermissionService } from './service/role-permission.service';

@Module({
  imports: [JwtModule],
  controllers: [RoleController, PermissionController, RolePermissionController],
  providers: [
    RoleService,
    PermissionService,
    RolePermissionService,
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
})
export class PermissionModule {}

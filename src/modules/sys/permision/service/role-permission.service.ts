import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { UpdateManyRolePermissionDto } from '../dtos/update-many-permission-detail.dto';

@Injectable()
export class RolePermissionService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findMany(roleId: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { sys: 'permission.role_permission.find_many_by_group_id' },
          roleId,
        )
        .pipe(timeout(100000)),
    );
    return res;
  }

  async updateMany(payload: UpdateManyRolePermissionDto[]) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'permission.role_permission.update_many' }, payload)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

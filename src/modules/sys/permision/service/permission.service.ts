import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
import { MSCommunicate } from 'src/utils/ms-output.util';

@Injectable()
export class PermissionService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findMany() {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'permission.permission.find_many' }, {})
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOneById(roleId: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'permission.permission.find_one' }, roleId)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

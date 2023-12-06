import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';

@Injectable()
export class RoleService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findMany(offset: number, limit: number, name: string) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'permission.role.find_many' }, { offset, limit, name })
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOneById(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'permission.role.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async createOne(payload: CreateRoleDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ sys: 'permission.role.create' }, payload),
    );
    return res;
  }

  async updateOne(id: number, payload: UpdateRoleDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { sys: 'permission.role.update' },
        { id, data: payload },
      ),
    );
    return res;
  }

  async softDeleteOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ sys: 'permission.role.delete' }, id),
    );
    return res;
  }
}

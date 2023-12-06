import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import {
  CreateDanhMucVachSonDto,
  UpdateDanhMucVachSonDto,
} from '../dtos/danh-muc-vach-son.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class DanhMucVachSonService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findAll(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'vach_son.danh_muc_vach_son.find_many' },
          { offset, limit, name },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOneById(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'vach_son.danh_muc_vach_son.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async createOne(payload: CreateDanhMucVachSonDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'vach_son.danh_muc_vach_son.create' }, payload)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async updateOne(id: number, payload: UpdateDanhMucVachSonDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'vach_son.danh_muc_vach_son.update' },
          { id: id, data: payload },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async softDelete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'vach_son.danh_muc_vach_son.delete' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

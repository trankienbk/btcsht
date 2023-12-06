import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import {
  CreateDanhMucNhaChoDto,
  UpdateDanhMucNhaChoDto,
} from '../dtos/danh-muc-nha-cho.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class DanhMucNhaChoService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}
  async findMany(offset: number, limit: number, filter: string) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'nha_cho.danh_muc_nha_cho.find_many' },
          { offset, limit, filter },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'nha_cho.danh_muc_nha_cho.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async create(payload: CreateDanhMucNhaChoDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'nha_cho.danh_muc_nha_cho.create' }, payload)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async update(id: number, payload: UpdateDanhMucNhaChoDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'nha_cho.danh_muc_nha_cho.update' },
          { id: id, data: payload },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'nha_cho.danh_muc_nha_cho.delete' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { MSCommunicate } from 'src/utils/ms-output.util';
import {
  CreateDanhMucBienBaoDto,
  UpdateDanhMucBienBaoDto,
} from '../dtos/danh-muc-bien-bao.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class DanhMucBienBaoService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findAll(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'bien_bao.danh_muc_bien_bao.find_many' },
          { offset, limit, name },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );

    return res;
  }

  async findOneById(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'bien_bao.danh_muc_bien_bao.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );

    return res;
  }

  async createOne(payload: CreateDanhMucBienBaoDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'bien_bao.danh_muc_bien_bao.create' }, payload)
        .pipe(timeout(MS_TIME_OUT)),
    );

    return res;
  }

  async updateOne(id: number, payload: UpdateDanhMucBienBaoDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'bien_bao.danh_muc_bien_bao.update' },
          { id: id, data: payload },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );

    return res;
  }

  async softDelete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'bien_bao.danh_muc_bien_bao.delete' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );

    return res;
  }
}

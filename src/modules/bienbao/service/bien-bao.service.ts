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
export class BienBaoService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findAll(offset: number, limit: number, filter: string) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'find_many_bien_bao' }, { offset, limit, filter })
        .pipe(timeout(MS_TIME_OUT)),
    );

    return res;
  }

  async findOneById(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'find_bien_bao_by_id' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );

    return res;
  }

  async createOne(payload: CreateDanhMucBienBaoDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'create_one_bien_bao' }, payload)
        .pipe(timeout(MS_TIME_OUT)),
    );

    return res;
  }

  async updateOne(id: number, payload: UpdateDanhMucBienBaoDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'update_one_bien_bao' }, { id: id, data: payload })
        .pipe(timeout(MS_TIME_OUT)),
    );

    return res;
  }

  async softDelete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'soft_delete_one_bien_bao' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );

    return res;
  }
}

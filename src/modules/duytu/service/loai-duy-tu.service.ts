import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import {
  CreateLoaiDuyTuDto,
  UpdateLoaiDuyTuDto,
} from '../dtos/loai-duy-tu.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class LoaiDuyTuService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findAll(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'duy_tu.danh_muc_duy_tu.find_many' },
          { offset, limit, name },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOneById(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'duy_tu.danh_muc_duy_tu.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async createOne(payload: CreateLoaiDuyTuDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ btcsht: 'duy_tu.danh_muc_duy_tu.create' }, payload),
    );
    return res;
  }

  async updateOne(id: number, payload: UpdateLoaiDuyTuDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { btcsht: 'duy_tu.danh_muc_duy_tu.update' },
        { id: id, data: payload },
      ),
    );
    return res;
  }

  async softDelete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ btcsht: 'duy_tu.danh_muc_duy_tu.delete' }, id),
    );
    return res;
  }
}

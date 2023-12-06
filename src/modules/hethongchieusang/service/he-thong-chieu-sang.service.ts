import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import {
  CreateHeThongChieuSangDto,
  UpdateHeThongChieuSangDto,
} from '../dtos/he-thong-chieu-sang.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class HeThongChieuSangService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'he_thong_chieu_sang.he_thong_chieu_sang.find_many' },
          { offset, limit, name },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'he_thong_chieu_sang.he_thong_chieu_sang.find_one' },
          id,
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async create(payload: CreateHeThongChieuSangDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { btcsht: 'he_thong_chieu_sang.he_thong_chieu_sang.create' },
        payload,
      ),
    );
    return res;
  }

  async update(id: number, payload: UpdateHeThongChieuSangDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { btcsht: 'he_thong_chieu_sang.he_thong_chieu_sang.update' },
        { id: id, data: payload },
      ),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { btcsht: 'he_thong_chieu_sang.he_thong_chieu_sang.delete' },
        id,
      ),
    );
    return res;
  }
}

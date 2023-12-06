import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import {
  CreateNhaDieuHanhDto,
  UpdateNhaDieuHanhDto,
} from '../dtos/nha-dieu-hanh.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class NhaDieuHanhService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'nha_dieu_hanh.nha_dieu_hanh.find_many' },
          { offset, limit, name },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'nha_dieu_hanh.nha_dieu_hanh.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async create(payload: CreateNhaDieuHanhDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { btcsht: 'nha_dieu_hanh.nha_dieu_hanh.create' },
        payload,
      ),
    );
    return res;
  }

  async update(id: number, payload: UpdateNhaDieuHanhDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { btcsht: 'nha_dieu_hanh.nha_dieu_hanh.update' },
        { id: id, data: payload },
      ),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ btcsht: 'nha_dieu_hanh.nha_dieu_hanh.delete' }, id),
    );
    return res;
  }
}

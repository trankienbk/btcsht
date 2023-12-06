import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
import { MSCommunicate } from 'src/utils/ms-output.util';
import {
  CreateDuyTuNhaChoDto,
  UpdateDuyTuNhaChoDto,
} from '../dtos/duy-tu-nha-cho.dto';
@Injectable()
export class DuyTuNhaChoService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    nhaChoId: number,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'nha_cho.duy_tu_nha_cho.find_many' },
          { offset, limit, nhaChoId },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'nha_cho.duy_tu_nha_cho.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    if (!res.data) throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
    return res;
  }

  async create(payload: CreateDuyTuNhaChoDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'nha_cho.duy_tu_nha_cho.create' }, payload)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async update(id: number, payload: UpdateDuyTuNhaChoDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'nha_cho.duy_tu_nha_cho.update' },
          { id: id, data: payload },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'nha_cho.duy_tu_nha_cho.delete' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

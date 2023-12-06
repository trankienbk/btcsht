import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
import { MSCommunicate } from 'src/utils/ms-output.util';
import {
  CreateDuyTuDiemDungDto,
  UpdateDuyTuDiemDungDto,
} from '../dtos/duy-tu-diem-dung.dto';
@Injectable()
export class DuyTuDiemDungService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findAll(
    offset: number | null,
    limit: number | null,
    diemDungId: number,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'diem_dung.duy_tu_diem_dung.find_many' },
          { offset, limit, diemDungId },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOneById(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'diem_dung.duy_tu_diem_dung.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    if (!res.data) throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
    return res;
  }

  async createOne(payload: CreateDuyTuDiemDungDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'diem_dung.duy_tu_diem_dung.create' }, payload)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async updateOne(id: number, payload: UpdateDuyTuDiemDungDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'diem_dung.duy_tu_diem_dung.update' },
          { id: id, data: payload },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async softDelete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'diem_dung.duy_tu_diem_dung.delete' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

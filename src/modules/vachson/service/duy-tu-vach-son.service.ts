import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
import { MSCommunicate } from 'src/utils/ms-output.util';
import {
  CreateDuyTuVachSonDto,
  UpdateDuyTuVachSonDto,
} from '../dtos/duy-tu-vach-son.dto';
@Injectable()
export class DuyTuVachSonService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    vachSonId: number,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'vach_son.duy_tu_vach_son.find_many' },
          { offset, limit, vachSonId },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'vach_son.duy_tu_vach_son.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    if (!res.data) throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
    return res;
  }

  async create(payload: CreateDuyTuVachSonDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'vach_son.duy_tu_vach_son.create' }, payload)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async update(id: number, payload: UpdateDuyTuVachSonDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'vach_son.duy_tu_vach_son.update' },
          { id: id, data: payload },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'vach_son.duy_tu_vach_son.delete' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

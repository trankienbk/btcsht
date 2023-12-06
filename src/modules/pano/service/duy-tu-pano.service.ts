import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
import { MSCommunicate } from 'src/utils/ms-output.util';
import {
  CreateDuyTuPanoDto,
  UpdateDuyTuPanoDto,
} from '../dtos/duy-tu-pano.dto';
@Injectable()
export class DuyTuPanoService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findMany(offset: number | null, limit: number | null, panoId: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'pano.duy_tu_pano.find_many' },
          { offset, limit, panoId },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'pano.duy_tu_pano.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    if (!res.data) throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
    return res;
  }

  async create(payload: CreateDuyTuPanoDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'pano.duy_tu_pano.create' }, payload)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async update(id: number, payload: UpdateDuyTuPanoDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'pano.duy_tu_pano.update' }, { id: id, data: payload })
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'pano.duy_tu_pano.delete' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

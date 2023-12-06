import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
import { CreatePanoDto, UpdatePanoDto } from '../dtos/pano.dto';
@Injectable()
export class PanoService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findAll(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'pano.pano.find_many' }, { offset, limit, name })
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'pano.pano.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async create(payload: CreatePanoDto, idFile: number[]) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'pano.pano.create' },
          { payload: payload, idFile: idFile },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async update(id: number, payload: UpdatePanoDto, idFile: number[]) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'pano.pano.update' },
          { id: id, data: payload, idFile: idFile },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'pano.pano.delete' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

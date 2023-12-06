import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { CreateDonViDto, UpdateDonViDto } from '../dtos/donvi.dto';

@Injectable()
export class DonviService {
  constructor(
    @Inject('MS_SERVICE')
    private readonly mSClient: ClientProxy,
  ) {}

  async findMany() {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'don_vi.don_vi.find_many' }, {})
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'don_vi.don_vi.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async getTree() {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'don_vi.don_vi.find_tree' }, {})
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async createOne(payload: CreateDonViDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'don_vi.don_vi.create' }, payload)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async updateOne(id: number, payload: UpdateDonViDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { sys: 'don_vi.don_vi.update' },
          {
            id: id,
            data: payload,
          },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'don_vi.don_vi.delete' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

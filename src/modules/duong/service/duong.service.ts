import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
import { MSCommunicate } from 'src/utils/ms-output.util';

@Injectable()
export class DuongService {
  constructor(
    @Inject('MS_SERVICE')
    private readonly mSClient: ClientProxy,
  ) {}

  async findMany() {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'duong.duong.find_many' }, {})
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'duong.duong.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

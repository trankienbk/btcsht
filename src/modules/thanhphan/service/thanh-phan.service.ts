import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class ThanhPhanService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findAll(code: string) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'ban_do.thanh_phan.find_many' }, { code })
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

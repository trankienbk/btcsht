import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';

@Injectable()
export class LoaiTinhTrangService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findManyLoaiTinhTrang() {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'tinh_trang.loai_tinh_trang.find_many' }, {})
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

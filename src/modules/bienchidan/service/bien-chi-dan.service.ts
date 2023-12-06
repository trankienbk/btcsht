import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import {
  CreateBienChiDanDto,
  UpdateBienChiDanDto,
} from '../dtos/bien-chi-dan.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class BienChiDanService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'bien_chi_dan.bien_chi_dan.find_many' },
          { offset, limit, name },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'bien_chi_dan.bien_chi_dan.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async create(payload: CreateBienChiDanDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { btcsht: 'bien_chi_dan.bien_chi_dan.create' },
        payload,
      ),
    );
    return res;
  }

  async update(id: number, payload: UpdateBienChiDanDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { btcsht: 'bien_chi_dan.bien_chi_dan.update' },
        { id: id, data: payload },
      ),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ btcsht: 'bien_chi_dan.bien_chi_dan.delete' }, id),
    );
    return res;
  }
}

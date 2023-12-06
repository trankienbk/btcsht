import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
import { CreateTinhTrangDto } from '../dtos/tinh-trang.dto';

@Injectable()
export class TinhTrangService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findMany(offset: number, limit: number, loaiTinhTrangId: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'tinh_trang.tinh_trang_doi_tuong.find_many' },
          { offset, limit, loaiTinhTrangId },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async createOne(payload: CreateTinhTrangDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'tinh_trang.tinh_trang_doi_tuong.create' }, payload)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOneById(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'tinh_trang.tinh_trang_doi_tuong.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async updateOne(id: number, payload: CreateTinhTrangDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'tinh_trang.tinh_trang_doi_tuong.update' },
          {
            id: id,
            data: payload,
          },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async deleteOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { btcsht: 'tinh_trang.tinh_trang_doi_tuong.delete' },
        id,
      ),
    );
    return res;
  }
}

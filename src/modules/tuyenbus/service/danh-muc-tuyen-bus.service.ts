import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import {
  CreateDanhMucTuyenBusDto,
  UpdateDanhMucTuyenBusDto,
} from '../dtos/danh-muc-tuyen-bus.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class DanhMucTuyenBusService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findAll(
    offset: number | null,
    limit: number | null,
    soHieuTuyenBus: string | null,
    diemDauCuoi: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'tuyen_bus.danh_muc_tuyen_bus.find_many' },
          { offset, limit, soHieuTuyenBus, diemDauCuoi },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOneById(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'tuyen_bus.danh_muc_tuyen_bus.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async createOne(payload: CreateDanhMucTuyenBusDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'tuyen_bus.danh_muc_tuyen_bus.create' }, payload)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async updateOne(id: number, payload: UpdateDanhMucTuyenBusDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'tuyen_bus.danh_muc_tuyen_bus.update' },
          { id: id, data: payload },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async softDelete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'tuyen_bus.danh_muc_tuyen_bus.delete' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

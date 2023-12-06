import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { UpdateDiemDungDto } from '../dtos/diem-dung.dto';
import { CreateDiemDungDto } from 'btcsht/src/modules/diemdung/dtos/diem-dung.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class DiemDungService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) { }

  async findAll(
    offset: number | null,
    limit: number | null,
    name: string | null,
    type: number | null,
    department: number | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'diem_dung.diem_dung.find_many' },
          { offset, limit, name, type, department },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOneById(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'diem_dung.diem_dung.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async createOne(payload: CreateDiemDungDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'diem_dung.diem_dung.create' }, payload)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async updateOne(id: number, payload: UpdateDiemDungDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'diem_dung.diem_dung.update' },
          { id: id, data: payload },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async softDelete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'diem_dung.diem_dung.delete' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

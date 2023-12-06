import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import {
  CreateNhaVeSinhDto,
  UpdateNhaVeSinhDto,
} from '../dtos/nha-ve-sinh.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class NhaVeSinhService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'nha_ve_sinh.nha_ve_sinh.find_many' },
          { offset, limit, name },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'nha_ve_sinh.nha_ve_sinh.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async create(payload: CreateNhaVeSinhDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ btcsht: 'nha_ve_sinh.nha_ve_sinh.create' }, payload),
    );
    return res;
  }

  async update(id: number, payload: UpdateNhaVeSinhDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { btcsht: 'nha_ve_sinh.nha_ve_sinh.update' },
        { id: id, data: payload },
      ),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ btcsht: 'nha_ve_sinh.nha_ve_sinh.delete' }, id),
    );
    return res;
  }
}

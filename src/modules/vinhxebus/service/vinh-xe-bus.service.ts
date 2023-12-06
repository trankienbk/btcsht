import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import {
  CreateVinhXeBusDto,
  UpdateVinhXeBusDto,
} from '../dtos/vinh-xe-bus.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class VinhXeBusService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'vinh_xe_bus.vinh_xe_bus.find_many' },
          { offset, limit, name },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'vinh_xe_bus.vinh_xe_bus.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async create(payload: CreateVinhXeBusDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ btcsht: 'vinh_xe_bus.vinh_xe_bus.create' }, payload),
    );
    return res;
  }

  async update(id: number, payload: UpdateVinhXeBusDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { btcsht: 'vinh_xe_bus.vinh_xe_bus.update' },
        { id: id, data: payload },
      ),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ btcsht: 'vinh_xe_bus.vinh_xe_bus.delete' }, id),
    );
    return res;
  }
}

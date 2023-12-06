import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { CreateCayXanhDto, UpdateCayXanhDto } from '../dtos/cay-xanh.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class CayXanhService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'cay_xanh.cay_xanh.find_many' },
          { offset, limit, name },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'cay_xanh.cay_xanh.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async create(payload: CreateCayXanhDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ btcsht: 'cay_xanh.cay_xanh.create' }, payload),
    );
    return res;
  }

  async update(id: number, payload: UpdateCayXanhDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { btcsht: 'cay_xanh.cay_xanh.update' },
        { id: id, data: payload },
      ),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ btcsht: 'cay_xanh.cay_xanh.delete' }, id),
    );
    return res;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { CreateHeNoiBoDto, UpdateHeNoiBoDto } from '../dtos/he-noi-bo.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class HeNoiBoService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'he_noi_bo.he_noi_bo.find_many' },
          { offset, limit, name },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'he_noi_bo.he_noi_bo.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async create(payload: CreateHeNoiBoDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ btcsht: 'he_noi_bo.he_noi_bo.create' }, payload),
    );
    return res;
  }

  async update(id: number, payload: UpdateHeNoiBoDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { btcsht: 'he_noi_bo.he_noi_bo.update' },
        { id: id, data: payload },
      ),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ btcsht: 'he_noi_bo.he_noi_bo.delete' }, id),
    );
    return res;
  }
}

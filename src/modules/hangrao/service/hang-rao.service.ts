import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { CreateHangRaoDto, UpdateHangRaoDto } from '../dtos/hang-rao.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class HangRaoService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'hang_rao.hang_rao.find_many' },
          { offset, limit, name },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'hang_rao.hang_rao.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async create(payload: CreateHangRaoDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ btcsht: 'hang_rao.hang_rao.create' }, payload),
    );
    return res;
  }

  async update(id: number, payload: UpdateHangRaoDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { btcsht: 'hang_rao.hang_rao.update' },
        { id: id, data: payload },
      ),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ btcsht: 'hang_rao.hang_rao.delete' }, id),
    );
    return res;
  }
}

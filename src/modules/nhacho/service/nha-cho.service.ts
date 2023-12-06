import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
import { CreateNhaChoDto, UpdateNhaChoDto } from '../dtos/nha-cho.dto';
@Injectable()
export class NhaChoService {
  constructor(@Inject('MS_SERVICE') private readonly client: ClientProxy) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.client
        .send({ btcsht: 'nha_cho.nha_cho.find_many' }, { offset, limit, name })
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.client
        .send({ btcsht: 'nha_cho.nha_cho.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async create(payload: CreateNhaChoDto, idFile: number[]) {
    const res: MSCommunicate = await firstValueFrom(
      this.client.send(
        { btcsht: 'nha_cho.nha_cho.create' },
        { payload: payload, idFile: idFile },
      ),
    );
    return res;
  }

  async update(id: number, payload: UpdateNhaChoDto, idFile: number[]) {
    const res: MSCommunicate = await firstValueFrom(
      this.client.send(
        { btcsht: 'nha_cho.nha_cho.update' },
        { id: id, data: payload, idFile: idFile },
      ),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.client.send({ btcsht: 'nha_cho.nha_cho.delete' }, id),
    );
    return res;
  }
}

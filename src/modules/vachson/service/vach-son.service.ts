import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
import { CreateVachSonDto, UpdateVachSonDto } from '../dtos/vach-son.dto';
@Injectable()
export class VachSonService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findAll(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'vach_son.vach_son.find_many' },
          { offset, limit, name },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'vach_son.vach_son.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async create(payload: CreateVachSonDto, idFile: number[]) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'vach_son.vach_son.create' },
          { payload: payload, idFile: idFile },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async update(id: number, payload: UpdateVachSonDto, idFile: number[]) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { btcsht: 'vach_son.vach_son.update' },
          { id: id, data: payload, idFile: idFile },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async delete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ btcsht: 'vach_son.vach_son.delete' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

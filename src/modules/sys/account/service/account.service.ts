import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { CreateAccountDto, UpdateAccountDto } from '../dtos/account.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class AccountService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findAll(
    offset: number,
    limit: number,
    username: string,
    fullname: string,
    donViId: string,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send(
          { sys: 'account.account.find_many' },
          { offset, limit, username, fullname, donViId },
        )
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findAllAccountsToBeDeleted() {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'deleted_accounts' }, {})
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findOneById(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'account.account.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async createOne(payload: CreateAccountDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'account.account.create' }, payload)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async updateOne(id: number, payload: UpdateAccountDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'account.account.update' }, { id: id, data: payload })
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async softDelete(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'account.account.delete' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async restore(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'account.account.restore' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }
}

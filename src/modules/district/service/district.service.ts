import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { CreateDistrictDto, UpdateDistrictDto } from '../dtos/district.dto';
import { MS_TIME_OUT } from 'src/common/constants/ms.constants';
@Injectable()
export class DistrictService {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  async findAll(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'district.district.find_many' }, { offset, limit, name })
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async findAllDistrictsToBeDeleted() {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ sys: 'dm_deleted_districts' }, {}),
    );
    return res;
  }

  async findOneById(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient
        .send({ sys: 'district.district.find_one' }, id)
        .pipe(timeout(MS_TIME_OUT)),
    );
    return res;
  }

  async createOne(payload: CreateDistrictDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ sys: 'district.district.create' }, payload),
    );
    return res;
  }

  async updateOne(id: number, payload: UpdateDistrictDto) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send(
        { sys: 'update_one_dm_district' },
        { id: id, data: payload },
      ),
    );
    return res;
  }

  async deleteOne(id: number) {
    const res: MSCommunicate = await firstValueFrom(
      this.mSClient.send({ sys: 'district.district.delete' }, id),
    );
    return res;
  }
}

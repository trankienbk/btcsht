import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import { MSCommunicate } from 'src/utils/ms-output.util';

@Injectable()
export class DuongService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  accessTokenRBMSKey = 'accessTokenRBMSKey';
  accessPermissionRBMS = '{"code":"QLDB_TuyenDuong","action":"_view"}';

  // @UseFilters(new HttpExceptionFilter())
  async findMany(
    offset: number,
    limit: number,
    name: string,
  ): Promise<MSCommunicate> {
    try {
      const data = await this.getManyRoadFromRBMS();
      return new MSCommunicate(
        HttpStatus.OK,
        Content.SUCCESSFULLY,
        Subject.ROAD,
        data,
        Field.READ,
      );
    } catch (err) {
      console.error(err.response?.data);
      return new MSCommunicate(
        HttpStatus.INTERNAL_SERVER_ERROR,
        Content.FAILED,
        Subject.ROAD,
        err,
        Field.READ,
      );
    }
  }

  async findOne(id: number): Promise<MSCommunicate> {
    try {
      const data = await this.getManyRoadFromRBMS();
      const road = data.find((item) => item.id == id);
      return new MSCommunicate(
        HttpStatus.OK,
        Content.SUCCESSFULLY,
        Subject.ROAD,
        road,
        Field.READ,
      );
    } catch (err) {
      console.error(err.response.data);
      return new MSCommunicate(
        HttpStatus.OK,
        Content.FAILED,
        Subject.ROAD,
        err,
        Field.READ,
      );
    }
  }

  async getManyRoadFromRBMS() {
    const accessTokenRBMS = await this.getAccessTokenFromRBMS();
    // token còn hạn
    const res = await firstValueFrom(
      this.httpService.post(
        'http://103.17.140.144:3051/duongbo/tuyenduong/getbyname',
        {
          name: '',
          all: 1,
        },
        {
          headers: {
            'X-Access-Token': String(accessTokenRBMS),
            'X-Access-Permission': this.accessPermissionRBMS,
          },
        },
      ),
    );
    return res.data.data;
  }

  async getAccessTokenFromRBMS() {
    let accessToken = await this.cacheService.get(this.accessTokenRBMSKey);
    if (!accessToken) {
      const res = await firstValueFrom(
        this.httpService.post('http://103.17.140.144:3051/auth/token', {
          username: 'admin123',
          password: '123456',
        }),
      );
      accessToken = res.data.token;
      this.cacheService.set(
        this.accessTokenRBMSKey,
        accessToken,
        3 * 60 * 60 * 1000,
      );
    }
    return accessToken;
  }
}

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { LoginPayloadDto } from '../dtos/login.dto';
import { AccountEntity } from '../entities/account.entity';

import func from '../../../../utils/ms-response.utli';

// shape
import { Error } from '../interface/common.interface';
import { Login, NULL, RefreshToken } from '../interface/auth.interface';
import { Subject } from 'src/common/message/subject.message';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  async signIn(payload: LoginPayloadDto): Promise<Error & Login> {
    const account = await this.accountRepository.findOne({
      where: { username: payload.username },
    });
    if (!account)
      return func.responseData(
        Subject.LOGIN,
        Content.NOT_FOUND,
        null,
        1,
        Field.ACCOUNT,
      );

    // compare password
    const isCheckPassword = await bcrypt.compare(
      payload.password,
      account.password,
    );
    if (!isCheckPassword) {
      return func.responseData(
        Subject.LOGIN,
        Content.NOT_FOUND,
        null,
        1,
        Field.PASSWORD,
      );
    }
    const { ...result } = account;
    delete result.password;

    // gen access token and refresh token key
    result.accessTokenKey = `${account.username}${uuidv4()}`;
    result.refreshTokenKey = `${account.username}${uuidv4()}`;

    // create token
    const accessToken = await this.jwtService.signAsync(result, {
      secret: process.env.JWT_SECRET_KEY_FOR_ACCESS_TOKEN,
      expiresIn: process.env.JWT_SECRET_KEY_FOR_ACCESS_TOKEN_EXPIRES_IN + 's',
    });
    const refreshToken = await this.jwtService.signAsync(result, {
      secret: process.env.JWT_SECRET_KEY_FOR_REFRESH_TOKEN,
      expiresIn: process.env.JWT_SECRET_KEY_FOR_REFRESH_TOKEN_EXPIRES_IN + 's',
    });

    const valueCache = JSON.stringify({
      accountId: result.id,
      username: result.username,
    });

    // save token to redis
    await this.cacheService.set(`${result.accessTokenKey}`, valueCache, {
      ttl: Number(process.env.JWT_SECRET_KEY_FOR_ACCESS_TOKEN_EXPIRES_IN),
    });

    await this.cacheService.set(
      result.refreshTokenKey,
      valueCache,
      {
        ttl: Number(process.env.JWT_SECRET_KEY_FOR_REFRESH_TOKEN_EXPIRES_IN),
      }, // 1 nam
    );

    return func.responseData(
      Subject.LOGIN,
      Content.SUCCESSFULLY,
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      0,
    );
  }

  async logout(accessTokenKey: string): Promise<Error & NULL> {
    const cacheData = JSON.parse(
      await this.cacheService.get(`${accessTokenKey}`),
    );

    await this.cacheService.del(`${accessTokenKey}`);
    await this.cacheService.del(`${cacheData.refreshTokenKey}`);

    return func.responseData(Subject.LOGOUT, Content.SUCCESSFULLY, null, 0);
  }

  async refresh(refreshTokenValue: string): Promise<Error & RefreshToken> {
    let flag = 0;
    const isToken = refreshTokenValue.split('.');
    isToken.forEach((item: any) => {
      if (!item) flag++;
    });
    if (isToken?.length !== 3) flag++;
    if (flag)
      return func.responseData(Subject.REFRESH_TOKEN, Content.INVALID, null, 1);
    const payload = await this.jwtService.verifyAsync(refreshTokenValue, {
      secret: process.env.JWT_SECRET_KEY_FOR_REFRESH_TOKEN,
    });

    const cacheDataRefreshToken = JSON.parse(
      await this.cacheService.get(`${payload.refreshTokenKey}`),
    );
    if (!cacheDataRefreshToken) {
      return func.responseData(
        Subject.REFRESH_TOKEN,
        Content.UNAUTHORIZATION,
        null,
        2,
      );
    }

    const account = await this.accountRepository.findOne({
      where: {
        id: cacheDataRefreshToken.accountId,
      },
    });

    const { ...accountWithoutPassword } = account;
    delete accountWithoutPassword.password;
    accountWithoutPassword.accessTokenKey = `${account.username}${uuidv4()}`;
    const accessToken = await this.jwtService.signAsync(
      accountWithoutPassword,
      {
        secret: process.env.JWT_SECRET_KEY_FOR_ACCESS_TOKEN,
        expiresIn: process.env.JWT_SECRET_KEY_FOR_ACCESS_TOKEN_EXPIRES_IN,
      },
    );
    accountWithoutPassword.refreshTokenKey = payload.refreshTokenKey;

    // save to redis
    await this.cacheService.set(
      `${accountWithoutPassword.accessTokenKey}`,
      `${JSON.stringify(accountWithoutPassword)}`,
      24 * 60 * 60 * 1000,
    );

    return func.responseData(
      Subject.REFRESH_TOKEN,
      Content.SUCCESSFULLY,
      {
        accessToken: accessToken,
      },
      0,
    );
  }
}

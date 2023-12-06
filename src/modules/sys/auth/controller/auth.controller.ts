import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Account } from '../../../../decorators/account.decorator';
import { LoginPayloadDto, RefreshDto } from '../dtos/login.dto';
import { AccountEntity, ProfileEntity } from '../entities/account.entity';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../service/auth.service';
import { HttpMessage } from 'src/common/message/http.message';
import func from '../../../../utils/ms-response.utli';

// shape
import { Response } from '../interface/common.interface';
import { Login, RefreshToken } from '../interface/auth.interface';

@Controller('auth')
@ApiTags('Xác thực')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiResponse({ status: 200, description: 'Get profile successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - catch validate' })
  getProfile(@Account() account: ProfileEntity): Response {
    delete account.iat;
    delete account.exp;
    delete account.accessTokenKey;
    delete account.refreshTokenKey;
    return func.response(
      HttpStatus.OK,
      HttpMessage.GLOBAL_VALIDATE.SUCCESSFULLY +
        '.' +
        HttpMessage.SUBJECT.PROFILE,
      account,
    );
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiResponse({ status: 200, description: 'Log out succesfully' })
  async logout(@Account() account: AccountEntity): Promise<Response> {
    const result = await this.authService.logout(account.accessTokenKey);
    return func.response(HttpStatus.OK, result.errMessage, result.data);
  }

  @Post('refresh-token')
  @ApiResponse({ status: 200, description: 'Get access token successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - catch validate' })
  async refresh(@Body() payload: RefreshDto): Promise<Response & RefreshToken> {
    const result = await this.authService.refresh(payload.refreshToken);
    return func.response(
      result.errCode ? HttpStatus.BAD_REQUEST : HttpStatus.OK,
      result.errMessage,
      result.data,
    );
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'Login successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - catch validate' })
  async login(@Body() payload: LoginPayloadDto): Promise<Response & Login> {
    const result = await this.authService.signIn(payload);
    return func.response(
      result.errCode == 1
        ? HttpStatus.BAD_REQUEST
        : result.errCode == 2
        ? HttpStatus.UNAUTHORIZED
        : HttpStatus.OK,
      result.errMessage,
      result.data,
    );
  }
}

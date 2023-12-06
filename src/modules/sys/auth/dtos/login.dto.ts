import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import func from '../../../../utils/ms-response.utli';
export class LoginPayloadDto {
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.LOGIN,
      Content.REQUIRED,
      Field.ACCOUNT,
    ),
  })
  @ApiProperty({
    description: 'Tên tài khoản',
    default: 'root',
  })
  username: string;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.LOGIN,
      Content.REQUIRED,
      Field.PASSWORD,
    ),
  })
  @ApiProperty({
    description: 'Mật khẩu',
    default: '123456',
  })
  password: string;
}

export class RefreshDto {
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.REFRESH_TOKEN,
      Content.REQUIRED,
      Field.REFRESH_TOKEN,
    ),
  })
  @ApiProperty({
    description: 'Refresh token',
    default: 'root',
  })
  refreshToken: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import func from '../../../../utils/ms-response.utli';

export class CreateAccountDto {
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.ACCOUNT,
      Content.NOT_NULL,
      Field.USERNAME,
    ),
  })
  @ApiProperty({
    description: 'tên tài khoản',
    default: 'root',
  })
  username: string;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.ACCOUNT,
      Content.NOT_NULL,
      Field.PASSWORD,
    ),
  })
  @ApiProperty({
    description: 'mật khẩu',
    default: '12345678',
  })
  password: string;

  @ApiProperty({
    description: 'họ và tên',
    default: 'fullname',
  })
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.ACCOUNT,
      Content.NOT_NULL,
      Field.FULLNAME,
    ),
  })
  fullname: string;

  @ApiProperty({
    description: 'số điện thoại',
    default: '0000000000',
  })
  phoneNumber: string | null;

  @ApiProperty({
    description: 'Địa phận quản lý',
    default: 1,
  })
  diaPhanQuanLyIds: number[];

  @ApiProperty({
    description: 'Đơn vị quản lý',
    default: 1,
  })
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.ACCOUNT,
      Content.NOT_NULL,
      Field.DON_VI_ID,
    ),
  })
  donViId: number;

  @ApiProperty({
    description: 'Nhóm quyền',
    default: 1,
  })
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.ACCOUNT,
      Content.NOT_NULL,
      Field.ROLE_ID,
    ),
  })
  roleId: number;
}
export class UpdateAccountPasswordDto {
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.ACCOUNT,
      Content.NOT_NULL,
      Field.PASSWORD,
    ),
  })
  @ApiProperty({
    description: 'mật khẩu',
    default: '12345678',
  })
  password: string;
}

export class UpdateAccountDto {
  @ApiProperty({
    description: 'họ và tên',
    default: 'fullname',
  })
  fullname: string | null;

  @ApiProperty({
    description: 'số điện thoại',
    default: '0000000000',
  })
  phoneNumber: string | null;

  @ApiProperty({
    description: 'Địa phận quản lý',
    default: 1,
  })
  diaPhanQuanLyIds: number[];

  @ApiProperty({
    description: 'Đơn vị quản lý',
    default: 1,
  })
  donViId: number;

  @ApiProperty({
    description: 'Nhóm quyền web',
    default: 1,
  })
  roleId: number;
}

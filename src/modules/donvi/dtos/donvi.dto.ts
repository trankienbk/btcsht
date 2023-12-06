import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, NotEquals } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import func from '../../../utils/ms-response.utli';
export class CreateDonViDto {
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.DON_VI,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @NotEquals(null, {
    message: func.responseValidate(
      Subject.DON_VI,
      Content.NOT_NULL,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên đơn vị',
    default: 'đơn vị 1',
  })
  name: string;

  @NotEquals(null, {
    message: func.responseValidate(
      Subject.DON_VI,
      Content.NOT_NULL,
      Field.CODE,
    ),
  })
  @ApiProperty({
    description: 'Mã đơn vị',
    default: '',
  })
  code: string;

  @ApiProperty({
    description: 'Ngày hoạt động của đơn vị',
    default: new Date(),
  })
  ngayHoatDong: Date;

  @ApiProperty({
    description: 'Đơn vị cha',
    default: null,
  })
  parentId: number | null;
}

export class UpdateDonViDto {
  @ApiProperty({
    description: 'Tên đơn vị',
    default: 'đơn vị 1',
  })
  name: string;

  @ApiProperty({
    description: 'Mã đơn vị',
    default: 'đơn vị 1',
  })
  code: string;

  @ApiProperty({
    description: 'Ngày hoạt động của đơn vị',
    default: new Date(),
  })
  ngayHoatDong: Date;
}

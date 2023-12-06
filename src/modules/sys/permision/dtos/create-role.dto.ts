import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import func from '../../../../utils/ms-response.utli';

export class CreateRoleDto {
  @ApiProperty({
    description: 'tên nhóm quyền',
  })
  @IsNotEmpty({
    message: func.responseValidate(Subject.ROLE, Content.REQUIRED, Field.NAME),
  })
  name: string;

  @ApiProperty({
    name: 'Mô tả nhóm quyền',
  })
  description: string;

  @ApiProperty({
    description: 'Ngày bắt đầu áp dụng',
  })
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.ROLE,
      Content.REQUIRED,
      Field.NGAY_BAT_DAU,
    ),
  })
  ngayBatDau: Date;
}

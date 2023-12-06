import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import ResponseHelper from 'src/utils/ms-response.utli';

export class CreateLoaiDuyTuDto {
  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.MAINTENNANCE_TYPE,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên loại duy tu',
    default: 'Thay thế',
  })
  name: string;

  @ApiProperty({
    description: 'Mô tả loại duy tu',
    default: '',
  })
  description: string;
}

export class UpdateLoaiDuyTuDto {
  @ApiProperty({
    description: 'Tên loại duy tu',
    default: 'Thay thế',
  })
  name: string;

  @ApiProperty({
    description: 'Mô tả loại duy tu',
    default: '',
  })
  description: string;
}

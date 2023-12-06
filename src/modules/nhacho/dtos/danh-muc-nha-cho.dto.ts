import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import ResponseHelper from 'src/utils/ms-response.utli';

export class CreateDanhMucNhaChoDto {
  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.BUS_SHELTERS_TYPE,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên loại nhà chờ',
    default: '',
  })
  name: string;

  @ApiProperty({
    description: 'Mô tả loại nhà chờ',
    default: '',
  })
  description: string;
}

export class UpdateDanhMucNhaChoDto extends PartialType(
  CreateDanhMucNhaChoDto,
) {}

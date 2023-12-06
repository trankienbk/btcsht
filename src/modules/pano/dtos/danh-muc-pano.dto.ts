import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import ResponseHelper from 'src/utils/ms-response.utli';

export class CreateDanhMucPanoDto {
  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.PANO_TYPE,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên loại pano',
    default: 'Thay thế',
  })
  name: string;

  @ApiProperty({
    description: 'Mô tả loại pano',
    default: '',
  })
  description: string;
}

export class UpdateDanhMucPanoDto extends PartialType(CreateDanhMucPanoDto) {}

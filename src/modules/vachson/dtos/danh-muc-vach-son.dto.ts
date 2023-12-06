import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import ResponseHelper from 'src/utils/ms-response.utli';

export class CreateDanhMucVachSonDto {
  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.LOAI_VACH_SON,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên loại vạch sơn',
    default: 'Thay thế',
  })
  name: string;

  @ApiProperty({
    description: 'Mô tả loại vạch sơn',
    default: '',
  })
  description: string;
}

export class UpdateDanhMucVachSonDto extends PartialType(
  CreateDanhMucVachSonDto,
) {}

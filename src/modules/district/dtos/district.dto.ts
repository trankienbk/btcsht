import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import func from '../../../utils/ms-response.utli';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';
export class CreateDistrictDto {
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.DISTRICT,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên quận/huyện',
    default: 'Ba Đình',
  })
  name: string;
}

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {}

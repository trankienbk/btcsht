import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import func from '../../../utils/ms-response.utli';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';
export class CreateHeNoiBoDto {
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.INNER_SIDEWALK,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên hè nội bộ',
    default: 'Vỉa 1',
  })
  name: string;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.INNER_SIDEWALK,
      Content.REQUIRED,
      Field.DIEM_DUNG_ID,
    ),
  })
  @ApiProperty({
    description: 'Đơn vị Id',
    default: 1,
  })
  diemDungId: number;

  @IsOptional()
  @ApiProperty({
    description: 'Mô tả',
    default: 'Mô tả',
  })
  description: string;
}

export class UpdateHeNoiBoDto extends PartialType(CreateHeNoiBoDto) {}

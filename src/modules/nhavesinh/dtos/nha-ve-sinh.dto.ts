import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import func from '../../../utils/ms-response.utli';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';
export class CreateNhaVeSinhDto {
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.TOILET,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên nhà vệ sinh',
    default: 'Nhà vệ sinh 1',
  })
  name: string;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.TOILET,
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

export class UpdateNhaVeSinhDto extends PartialType(CreateNhaVeSinhDto) {}

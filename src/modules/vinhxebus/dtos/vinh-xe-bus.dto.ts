import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import func from '../../../utils/ms-response.utli';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';
export class CreateVinhXeBusDto {
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.BUS_STOP_BAY,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên vịnh xe buýt',
    default: 'Vịnh xe buýt 1',
  })
  name: string;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.BUS_STOP_BAY,
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

export class UpdateVinhXeBusDto extends PartialType(CreateVinhXeBusDto) {}

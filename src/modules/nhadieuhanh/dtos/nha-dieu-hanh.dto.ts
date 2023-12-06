import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import func from '../../../utils/ms-response.utli';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';
export class CreateNhaDieuHanhDto {
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.CONTROL_CENTER_HOUSE,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên nhà điều hành',
    default: 'Nhà điều hành 1',
  })
  name: string;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.CONTROL_CENTER_HOUSE,
      Content.REQUIRED,
      Field.MONG,
    ),
  })
  @ApiProperty({
    description: 'Tình trạng móng',
    default: 'Móng 1',
  })
  mong: string;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.CONTROL_CENTER_HOUSE,
      Content.REQUIRED,
      Field.NEN,
    ),
  })
  @ApiProperty({
    description: 'Tình trạng nền',
    default: 'Nền 1',
  })
  nen: string;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.CONTROL_CENTER_HOUSE,
      Content.REQUIRED,
      Field.MAI,
    ),
  })
  @ApiProperty({
    description: 'Tình trạng mái',
    default: 'Mái 1',
  })
  mai: string;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.CONTROL_CENTER_HOUSE,
      Content.REQUIRED,
      Field.THIET_BI_BIEN,
    ),
  })
  @ApiProperty({
    description: 'Thông tin thiết bị điện',
    default: 'Thiêt bị 1',
  })
  thietBi: string;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.CONTROL_CENTER_HOUSE,
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

export class UpdateNhaDieuHanhDto extends PartialType(CreateNhaDieuHanhDto) {}

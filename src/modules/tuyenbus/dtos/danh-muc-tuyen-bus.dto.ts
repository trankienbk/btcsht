import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import ResponseHelper from 'src/utils/ms-response.utli';

export class CreateDanhMucTuyenBusDto {
  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.BUS_ROUTES,
      Content.REQUIRED,
      Field.SO_HIEU_TUYEN_BUS,
    ),
  })
  @ApiProperty({
    description: 'Tên tuyến bus',
    default: 'Thay thế',
  })
  soHieuTuyenBus: string;

  @ApiProperty({
    description: 'Mô tả tuyến bus',
    default: '',
  })
  description: string;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.BUS_ROUTES,
      Content.REQUIRED,
      Field.DIEM_DAU,
    ),
  })
  @ApiProperty({
    description: 'Điểm đầu',
    default: 1,
  })
  diemDau: number;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.BUS_ROUTES,
      Content.REQUIRED,
      Field.DIEM_CUOI,
    ),
  })
  @IsNotEmpty({
    message: 'Số hiệu tuyến bus không được để trống',
  })
  @ApiProperty({
    description: 'Điểm cuối',
    default: 1,
  })
  diemCuoi: number;

  @ApiProperty({
    description: 'Lộ trình đi',
    default: [],
  })
  loTrinhDi: string[];

  @ApiProperty({
    description: 'Lộ trình về',
    default: [],
  })
  loTrinhVe: string[];
}

export class UpdateDanhMucTuyenBusDto extends PartialType(
  CreateDanhMucTuyenBusDto,
) {}

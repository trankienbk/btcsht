import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import ResponseHelper from 'src/utils/ms-response.utli';

export class CreateDuyTuNhaChoDto {
  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.DUY_TU_NHA_CHO,
      Content.REQUIRED,
      Field.NGAY_AP_DUNG,
    ),
  })
  @ApiProperty({
    description: 'Ngày áp dụng',
  })
  ngayApDung: Date;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.DUY_TU_NHA_CHO,
      Content.REQUIRED,
      Field.TINH_TRANG_ID,
    ),
  })
  @ApiProperty({
    description: 'Tinh trạng',
    default: 1,
  })
  tinhTrangId: number;

  @ApiProperty({
    description: 'Chi tiết tình trạng',
  })
  chiTietTinhTrang: string;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.DUY_TU_NHA_CHO,
      Content.REQUIRED,
      Field.THANH_PHAN,
    ),
  })
  @ApiProperty({
    description: 'Thành phần',
  })
  thanhPhan: number;

  @ApiProperty({
    description: 'Ghi chú',
  })
  ghiChu: string;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.DUY_TU_NHA_CHO,
      Content.REQUIRED,
      Field.VACH_SON_ID,
    ),
  })
  @ApiProperty({
    description: 'id nhà chờ',
  })
  nhaChoId: number;

  @ApiProperty({
    description: 'id duy tu',
  })
  duyTuId: number;
}

export class UpdateDuyTuNhaChoDto extends PartialType(CreateDuyTuNhaChoDto) {}

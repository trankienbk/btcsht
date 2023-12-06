import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import ResponseHelper from 'src/utils/ms-response.utli';

export class CreateDuyTuDiemDungDto {
  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.DUY_TU_DIEM_DUNG,
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
      Subject.DUY_TU_DIEM_DUNG,
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

  @ApiProperty({
    description: 'Ghi chú',
  })
  ghiChu: string;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.DUY_TU_DIEM_DUNG,
      Content.REQUIRED,
      Field.DIEM_DUNG_ID,
    ),
  })
  @ApiProperty({
    description: 'id điểm dừng',
  })
  diemDungId: number;

  @ApiProperty({
    description: 'id duy tu',
  })
  duyTuId: number;
}

export class UpdateDuyTuDiemDungDto extends PartialType(
  CreateDuyTuDiemDungDto,
) {}

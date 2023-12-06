import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import ResponseHelper from 'src/utils/ms-response.utli';

export class CreateDiemDungDto {
  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.DIEM_DUNG,
      Content.REQUIRED,
      Field.CODE,
    ),
  })
  @ApiProperty({
    description: 'Mã điểm dừng',
    default: 'DD001',
  })
  code: string;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.DIEM_DUNG,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên điểm dừng',
    default: '30 Cầu Giấy',
  })
  name: string;

  @IsNotEmpty({
    message: ' không được để trống',
  })
  @ApiProperty({
    description: 'Id đường',
  })
  duongId: number;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.DIEM_DUNG,
      Content.REQUIRED,
      Field.DON_VI_ID,
    ),
  })
  @ApiProperty({
    description: 'Đơn vị quản lý',
  })
  donViQuanLyId: number;

  @ApiProperty({
    description: 'Loại điểm dừng',
  })
  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.DIEM_DUNG,
      Content.REQUIRED,
      Field.LOAI_DIEM_DUNG_ID,
    ),
  })
  loaiDiemDungId: number;

  @ApiProperty({
    description: 'Tình trạng diểm dừng',
  })
  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.DIEM_DUNG,
      Content.REQUIRED,
      Field.TINH_TRANG_ID,
    ),
  })
  tinhTrangId: number;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.DIEM_DUNG,
      Content.REQUIRED,
      Field.NGAY_SU_DUNG,
    ),
  })
  @ApiProperty({
    description: 'Ngày sử dụng',
  })
  ngaySuDung: Date;

  @ApiProperty({
    description: 'Ngày kết thúc',
  })
  ngayKetThuc: Date;

  @ApiProperty({
    description: 'Địa chỉ',
  })
  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.DIEM_DUNG,
      Content.REQUIRED,
      Field.DIA_CHI,
    ),
  })
  diaChi: string;
}

export class UpdateDiemDungDto {
  @ApiProperty({
    description: 'Mã điểm dừng',
    default: 'DD001',
  })
  code: string;

  @ApiProperty({
    description: 'Tên điểm dừng',
    default: '30 Cầu Giấy',
  })
  name: string;

  @ApiProperty({
    description: 'Đường',
  })
  duongId: number;

  @ApiProperty({
    description: 'Đơn vị quản lý',
  })
  donViQuanLyId: number;

  @ApiProperty({
    description: 'Loại điểm dừng',
  })
  loaiDiemDungId: number;

  @ApiProperty({
    description: 'Tình trạng',
  })
  tinhTrangId: number;

  @ApiProperty({
    description: 'Ngày sử dụng',
  })
  ngaySuDung: Date;

  @ApiProperty({
    description: 'Ngày kết thúc',
  })
  ngayKetThuc: Date;

  @ApiProperty({
    description: 'Địa chỉ',
  })
  diaChi: string;
}

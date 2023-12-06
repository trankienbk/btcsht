import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import ResponseHelper from 'src/utils/ms-response.utli';

export class CreatePanoDto {
  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.PANO,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên pano',
    default: 'Pano 1',
  })
  name: string;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.PANO,
      Content.REQUIRED,
      Field.VAT_LIEU,
    ),
  })
  @ApiProperty({
    description: 'Vật liệu',
    default: 'Vật liệu 1',
  })
  vatLieu: string;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.PANO,
      Content.REQUIRED,
      Field.VI_TRI,
    ),
  })
  @ApiProperty({
    description: 'Vị trí',
    default: 'Vị trí 1',
  })
  viTri: string;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.PANO,
      Content.REQUIRED,
      Field.THONG_TIN,
    ),
  })
  @ApiProperty({
    description: 'Thông tin',
    default: 'Thông tin 1',
  })
  thongTin: string;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.PANO,
      Content.REQUIRED,
      Field.LOAI_PANO_ID,
    ),
  })
  @ApiProperty({
    description: 'Loại pano Id',
    default: 1,
  })
  loaiPanoId: number;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.PANO,
      Content.REQUIRED,
      Field.CHIEU_DAI,
    ),
  })
  @ApiProperty({
    description: 'Chiều dài',
    default: 1,
  })
  chieuDai: number;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.PANO,
      Content.REQUIRED,
      Field.CHIEU_RONG,
    ),
  })
  @ApiProperty({
    description: 'Chiều rộng',
    default: 1,
  })
  chieuRong: number;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.PANO,
      Content.REQUIRED,
      Field.NAM_DAU_TU,
    ),
  })
  @ApiProperty({
    description: 'Năm đầu tư',
    default: 2020,
  })
  namDauTu: number;

  @ApiProperty({
    description: 'Mô tả móng pano',
    default: 'Mô tả',
  })
  mongDescription: string;

  @ApiProperty({
    description: 'Ghi chú',
    default: 'Ghi chú',
  })
  ghiChu: string;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.PANO,
      Content.REQUIRED,
      Field.DIEM_DUNG_ID,
    ),
  })
  @ApiProperty({
    description: 'id điểm dừng',
    default: 1,
  })
  diemDungId: number;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.PANO,
      Content.REQUIRED,
      Field.TINH_TRANG_ID,
    ),
  })
  @ApiProperty({
    description: 'id tình trạng',
    default: 1,
  })
  tinhTrangId: number;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: Express.Multer.File;
}

export class UpdatePanoDto extends PartialType(CreatePanoDto) {}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import ResponseHelper from 'src/utils/ms-response.utli';

export class CreateVachSonDto {
  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.VACH_SON,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên vạch sơn',
    default: 'Vạch sơn 1',
  })
  name: string;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.VACH_SON,
      Content.REQUIRED,
      Field.LOAI_VACH_SON_ID,
    ),
  })
  @ApiProperty({
    description: 'Loại vạch sơn Id',
    default: 1,
  })
  loaiVachSonId: number;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.VACH_SON,
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
      Subject.VACH_SON,
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
      Subject.VACH_SON,
      Content.REQUIRED,
      Field.KHOANG_CACH_MEP_DUONG,
    ),
  })
  @ApiProperty({
    description: 'Khoảng cách mép đường',
    default: 1,
  })
  khoangCachMepDuong: number;

  @ApiProperty({
    description: 'Mô tả vạch sơn',
    default: 'Mô tả',
  })
  description: string;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.VACH_SON,
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
      Subject.VACH_SON,
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

export class UpdateVachSonDto extends PartialType(CreateVachSonDto) {}

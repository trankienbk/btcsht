import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import ResponseHelper from 'src/utils/ms-response.utli';

export class CreateNhaChoDto {
  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.BUS_SHELTERS,
      Content.REQUIRED,
      Field.DIEM_DUNG_ID,
    ),
  })
  @ApiProperty({
    description: 'Điểm dừng id',
  })
  diemDungId: number;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.BUS_SHELTERS,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên nhà chờ',
  })
  name: string;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.BUS_SHELTERS,
      Content.REQUIRED,
      Field.LOAI_NHA_CHO_ID,
    ),
  })
  @ApiProperty({
    description: 'Loại nhà chờ',
  })
  loaiNhaChoId: number;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.BUS_SHELTERS,
      Content.REQUIRED,
      Field.TINH_TRANG_ID,
    ),
  })
  @ApiProperty({
    description: 'Tình trạng nhà chờ',
  })
  tinhTrangId: number;

  @ApiProperty({
    description: 'Chiều dài nhà chờ',
  })
  chieuDai: number;

  @ApiProperty({
    description: 'Chiều rộng nhà chờ',
  })
  chieuRong: number;

  @ApiProperty({
    description: 'Năm đầu tư nhà chờ',
  })
  namDauTu: Date;

  @ApiProperty({
    description: 'Ghi chú nhà chờ',
  })
  note: string;

  @ApiProperty({
    description: 'Chiều rộng mái nhà chờ',
  })
  chieuRongMai: number;

  @ApiProperty({
    description: 'Chiều Dài Mái nhà chờ',
  })
  chieuDaiMai: number;

  @ApiProperty({
    description: 'Vật liệu mái nhà chờ',
  })
  vatLieuMai: string;

  @ApiProperty({
    description: 'Chiều dài cột nhà chờ',
  })
  chieuDaiCot: number;

  @ApiProperty({
    description: 'Đường kính cột nhà chờ',
  })
  duongKinhCot: number;

  @ApiProperty({
    description: 'Màu sắc cột nhà chờ',
  })
  mauSacCot: string;

  @ApiProperty({
    description: 'Vật liệu cột nhà chờ',
  })
  vatLieuCot: string;

  @ApiProperty({
    description: 'Chiều dài khung nhà chờ',
  })
  chieuDaiKhung: number;

  @ApiProperty({
    description: 'Chiều rộng khung nhà chờ',
  })
  chieuRongKhung: number;

  @ApiProperty({
    description: 'Vật liệu khung nhà chờ',
  })
  vatLieuKhung: string;

  @ApiProperty({
    description: 'Chiều dài ghế nhà chờ',
  })
  chieuDaiGhe: number;

  @ApiProperty({
    description: 'Vật liệu ghế nhà chờ',
  })
  vatLieuGhe: string;

  @ApiProperty({
    description: 'Chiều dài tấm mica nhà chờ',
  })
  chieuDaiTamMica: number;

  @ApiProperty({
    description: 'Chiều rộng tấm mica nhà chờ',
  })
  chieuRongTamMica: number;

  @ApiProperty({
    description: 'Mô tả tấm mica nhà chờ',
  })
  descriptionTamMica: string;

  @ApiProperty({
    description: 'Mô tả móng nhà chờ',
  })
  descriptionMong: string;

  @ApiProperty({
    description: 'Mô tả lưng nhà chờ',
  })
  descriptionLung: string;

  @ApiProperty({
    description: 'Mô tả hông nhà chờ',
  })
  descriptionHong: string;

  @ApiProperty({
    description: 'Mô tả hồi nhà chờ',
  })
  descriptionHoi: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: Express.Multer.File;
}

export class UpdateNhaChoDto extends PartialType(CreateNhaChoDto) {}

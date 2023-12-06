import { Field } from 'src/common/message/field.message';
import { Content } from 'src/common/message/content.message';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import func from '../../../utils/ms-response.utli';
import { Subject } from 'src/common/message/subject.message';

export class CreateBienBaoDto {
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.BIEN_BAO,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên',
    default: 'Biển báo 1',
  })
  name: string;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.BIEN_BAO,
      Content.REQUIRED,
      Field.LOAI_BIEN_BAO_ID,
    ),
  })
  @ApiProperty({
    description: 'Loại biển báo',
    default: 1,
  })
  loaiBienBaoId: number;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.BIEN_BAO,
      Content.REQUIRED,
      Field.LOAI_TINH_TRANG_ID,
    ),
  })
  @ApiProperty({
    description: 'Loại tình trạng',
    default: 1,
  })
  loaiTinhTrangId: number;
}

export class UpdateBienBaoDto extends PartialType(CreateBienBaoDto) {}

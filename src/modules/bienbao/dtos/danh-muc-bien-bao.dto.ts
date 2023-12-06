import { Field } from 'src/common/message/field.message';
import { Content } from 'src/common/message/content.message';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import func from '../../../utils/ms-response.utli';
import { Subject } from 'src/common/message/subject.message';

export class CreateDanhMucBienBaoDto {
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.LOAI_BIEN_BAO,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên',
    default: 'Biển báo 1',
  })
  name: string;

  @ApiProperty({
    description: 'Mô tả',
    default: '',
  })
  description?: string;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.LOAI_BIEN_BAO,
      Content.REQUIRED,
      Field.MAI_BIEN_BAO,
    ),
  })
  @ApiProperty({
    description: 'Mái',
    default: false,
  })
  isMai: boolean;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.LOAI_BIEN_BAO,
      Content.REQUIRED,
      Field.COT_BIEN_BAO,
    ),
  })
  @ApiProperty({
    description: 'Cột',
    default: false,
  })
  isCot: boolean;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.LOAI_BIEN_BAO,
      Content.REQUIRED,
      Field.HOP_BIEN_BAO,
    ),
  })
  @ApiProperty({
    description: 'Hộp',
    default: false,
  })
  isHop: boolean;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.LOAI_BIEN_BAO,
      Content.REQUIRED,
      Field.DEN_CHIEU_SANG_BIEN_BAO,
    ),
  })
  @ApiProperty({
    description: 'Đèn chiếu sáng',
    default: false,
  })
  isDenChieuSang: boolean;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.LOAI_BIEN_BAO,
      Content.REQUIRED,
      Field.MONG_BIEN_BAO,
    ),
  })
  @ApiProperty({
    description: 'Móng',
    default: false,
  })
  isMong: boolean;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.LOAI_BIEN_BAO,
      Content.REQUIRED,
      Field.MAT_TRUOC,
    ),
  })
  @ApiProperty({
    description: 'Mặt trước',
    default: 'so_hieu_tuyen_bus',
  })
  matTruoc: string;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.LOAI_BIEN_BAO,
      Content.REQUIRED,
      Field.MAT_SAU,
    ),
  })
  @ApiProperty({
    description: 'Mặt sau',
    default: 'lo_trinh_rut_ngan',
  })
  matSau: string;
}

export class UpdateDanhMucBienBaoDto extends PartialType(
  CreateDanhMucBienBaoDto,
) {}

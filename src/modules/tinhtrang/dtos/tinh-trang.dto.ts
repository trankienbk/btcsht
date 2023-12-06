import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import func from '../../../utils/ms-response.utli';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';

export class CreateTinhTrangDto {
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.TINH_TRANG,
      Content.REQUIRED,
      Field.LOAI_TINH_TRANG_ID,
    ),
  })
  @ApiProperty({
    description: 'Id loại tình trạng',
    default: 1,
  })
  loaiTinhTrangId: number;

  @IsNotEmpty({
    message: func.responseValidate(
      Subject.TINH_TRANG,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @ApiProperty({
    description: 'Tên tình trạng',
    default: 'Bình thường',
  })
  name: string;
}

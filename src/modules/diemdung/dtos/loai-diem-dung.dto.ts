import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import ResponseHelper from 'src/utils/ms-response.utli';

export class UpdateDiemDungCauHinhDto {
  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.BUS_STOP_TYPE,
      Content.REQUIRED,
      Field.ID,
    ),
  })
  @ApiProperty({
    description: 'id',
    default: '1',
  })
  id: number;

  @IsNotEmpty({
    message: ResponseHelper.responseValidate(
      Subject.BUS_STOP_TYPE,
      Content.REQUIRED,
      Field.OBJECT_STATUS,
    ),
  })
  @ApiProperty({
    description: 'status',
    default: true,
  })
  objectStatus: boolean;
}

export class UpdateDiemDungParentDto {
  @IsNotEmpty({
    message: 'data không được để trống',
  })
  @ApiProperty({
    isArray: true,
    type: UpdateDiemDungCauHinhDto,
  })
  data: UpdateDiemDungCauHinhDto[];
}

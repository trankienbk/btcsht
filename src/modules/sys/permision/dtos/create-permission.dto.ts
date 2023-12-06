import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, NotEquals } from 'class-validator';
import func from '../../../../utils/ms-response.utli';
import { Subject } from 'src/common/message/subject.message';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Tên nhóm quyền',
  })
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.PERMISSION,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  @NotEquals(null, {
    message: func.responseValidate(
      Subject.DON_VI,
      Content.REQUIRED,
      Field.NAME,
    ),
  })
  name: string;

  @ApiProperty({
    name: 'id của permission cha',
  })
  parentId: number;
}

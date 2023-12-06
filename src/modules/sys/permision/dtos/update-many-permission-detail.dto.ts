import { IsNotEmpty } from 'class-validator';
import func from '../../../../utils/ms-response.utli';
import { Field } from 'src/common/message/field.message';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateManyRolePermissionDto {
  @ApiProperty({
    description: 'Id của role permission',
  })
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.ROLE_PERMISSION,
      Content.REQUIRED,
      Field.ID,
    ),
  })
  rolePermissionId: number;

  @ApiProperty({
    description: 'read',
  })
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.ROLE_PERMISSION,
      Content.REQUIRED,
      Field.ID,
    ),
  })
  read: boolean;

  @ApiProperty({
    description: 'create',
  })
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.ROLE_PERMISSION,
      Content.REQUIRED,
      Field.ID,
    ),
  })
  create: boolean;

  @ApiProperty({
    description: 'update',
  })
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.ROLE_PERMISSION,
      Content.REQUIRED,
      Field.ID,
    ),
  })
  update: boolean;

  @ApiProperty({
    description: 'delete',
  })
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.ROLE_PERMISSION,
      Content.REQUIRED,
      Field.ID,
    ),
  })
  delete: boolean;

  @ApiProperty({
    description: 'export',
  })
  @IsNotEmpty({
    message: func.responseValidate(
      Subject.ROLE_PERMISSION,
      Content.REQUIRED,
      Field.ID,
    ),
  })
  export: boolean;
}

import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({
    description: 'tên nhóm quyền',
  })
  name: string;

  @ApiProperty({
    name: 'Mô tả nhóm quyền',
  })
  description: string;

  @ApiProperty({
    description: 'Ngày bắt đầu áp dụng',
  })
  ngayBatDau: Date;
}

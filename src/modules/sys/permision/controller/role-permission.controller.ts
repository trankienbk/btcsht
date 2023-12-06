import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolePermissionService } from '../service/role-permission.service';
import { UpdateManyRolePermissionDto } from '../dtos/update-many-permission-detail.dto';
import func from '../../../../utils/ms-response.utli';

@Controller('role-permission')
@ApiTags('Quyền hạn chi tiết')
export class RolePermissionController {
  constructor(private rolePermissonService: RolePermissionService) {}

  @Get(':roleId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Tìm quyền hạn chi tiết bởi nhóm quyền ID' })
  @ApiResponse({
    status: 200,
    description: 'Find role-permission successfully',
  })
  async findRolePermisson(@Param('roleId') roleId: number) {
    const result = await this.rolePermissonService.findMany(roleId);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật một quyền hạn chi tiết' })
  @ApiResponse({
    status: 200,
    description: 'Update role-permission successfully',
  })
  @ApiBody({ type: [UpdateManyRolePermissionDto] })
  async updateManyrolePermisson(
    @Body() payload: UpdateManyRolePermissionDto[],
  ) {
    const result = await this.rolePermissonService.updateMany(payload);
    return func.response(result.statusCode, result.message, result.data);
  }
}

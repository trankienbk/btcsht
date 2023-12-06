import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PermissionService } from '../service/permission.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import func from '../../../../utils/ms-response.utli';

@Controller('permission')
@ApiTags('Quyền hạn')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Tìm danh sách quyền' })
  @ApiResponse({ status: 200, description: 'Find permission successfully' })
  async findManyPermission() {
    const result = await this.permissionService.findMany();
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Tìm quyền' })
  @ApiResponse({ status: 200, description: 'Find permission successfully' })
  async findPermissionById(@Param('id') id: number) {
    const result = await this.permissionService.findOneById(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

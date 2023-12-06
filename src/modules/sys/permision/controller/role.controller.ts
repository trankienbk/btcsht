import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import func from '../../../../utils/ms-response.utli';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { RoleService } from '../service/role.service';

@Controller('role')
@ApiTags('Nhóm quyền hạn')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Offset param',
    type: 'number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit param',
    type: 'number',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Name param',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách nhóm quyền' })
  @ApiResponse({ status: 200, description: 'Get all role successfully' })
  async findManyRole(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('name') name: string,
  ) {
    const result = await this.roleService.findMany(offset, limit, name);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một nhóm quyền cụ thể' })
  @ApiResponse({ status: 200, description: 'Get role successfully' })
  async findRoleById(@Param('id') id: number) {
    const result = await this.roleService.findOneById(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Thêm mới một nhóm quyền' })
  @ApiResponse({ status: 201, description: 'Create role successfully' })
  async createOneRole(@Body() payload: CreateRoleDto) {
    const result = await this.roleService.createOne(payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật một nhóm quyền' })
  @ApiResponse({ status: 200, description: 'Update role successfully' })
  async updateOneRole(@Param('id') id: number, @Body() payload: UpdateRoleDto) {
    const result = await this.roleService.updateOne(id, payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một nhóm quyền' })
  @ApiResponse({ status: 200, description: 'Delete role successfully' })
  async softDeleteOneRole(@Param('id') id: number) {
    const result = await this.roleService.softDeleteOne(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

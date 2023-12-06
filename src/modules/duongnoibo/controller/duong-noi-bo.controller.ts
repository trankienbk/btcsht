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
import { AuthGuard } from 'src/modules/sys/auth/guards/auth.guard';
import {
  CreateDuongNoiBoDto,
  UpdateDuongNoiBoDto,
} from '../dtos/duong-noi-bo.dto';
import { DuongNoiBoService } from '../service/duong-noi-bo.service';
import func from '../../../utils/ms-response.utli';
@Controller('duong-noi-bo/doi-tuong')
@ApiTags('Đường nội bộ')
export class DuongNoiBoController {
  constructor(private duongNoiBoService: DuongNoiBoService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Bỏ qua một số lượng bản ghi nhất định',
    type: 'number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Giới hạn số bản ghi trong một trang',
    type: 'number',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Tên đường nội bộ',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách đường nội bộ' })
  @ApiResponse({
    status: 200,
    description: 'Get all đường nội bộ successfully',
  })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.duongNoiBoService.findMany(offset, limit, name);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một đường nội bộ cụ thể' })
  @ApiResponse({ status: 200, description: 'Get cay xanh successfully' })
  async findOne(@Param('id') id: number) {
    const result = await this.duongNoiBoService.findOne(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Thêm mới đường nội bộ' })
  @ApiResponse({ status: 201, description: 'Create cay xanh successfully' })
  async create(@Body() payload: CreateDuongNoiBoDto) {
    const result = await this.duongNoiBoService.create(payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật đường nội bộ' })
  @ApiResponse({ status: 200, description: 'Update cay xanh successfully' })
  async update(@Param('id') id: number, @Body() payload: UpdateDuongNoiBoDto) {
    const result = await this.duongNoiBoService.update(id, payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá đường nội bộ' })
  @ApiResponse({ status: 200, description: 'Delete cay xanh successfully' })
  async delete(@Param('id') id: number) {
    const result = await this.duongNoiBoService.delete(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

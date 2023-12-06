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
  CreateNhaVeSinhDto,
  UpdateNhaVeSinhDto,
} from '../dtos/nha-ve-sinh.dto';
import { NhaVeSinhService } from '../service/nha-ve-sinh.service';
import func from '../../../utils/ms-response.utli';
@Controller('nha-ve-sinh/doi-tuong')
@ApiTags('Nhà vệ sinh')
export class NhaVeSinhController {
  constructor(private nhaVeSinhService: NhaVeSinhService) {}

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
    description: 'Tên nhà vệ sinh',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách nhà vệ sinh' })
  @ApiResponse({
    status: 200,
    description: 'Get all nhà vệ sinh successfully',
  })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.nhaVeSinhService.findMany(offset, limit, name);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một nhà vệ sinh cụ thể' })
  @ApiResponse({ status: 200, description: 'Get nha ve sinh successfully' })
  async findOne(@Param('id') id: number) {
    const result = await this.nhaVeSinhService.findOne(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Thêm mới nhà vệ sinh' })
  @ApiResponse({ status: 201, description: 'Create nha ve sinh successfully' })
  async create(@Body() payload: CreateNhaVeSinhDto) {
    const result = await this.nhaVeSinhService.create(payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật nhà vệ sinh' })
  @ApiResponse({ status: 200, description: 'Update nha ve sinh successfully' })
  async update(@Param('id') id: number, @Body() payload: UpdateNhaVeSinhDto) {
    const result = await this.nhaVeSinhService.update(id, payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá nhà vệ sinh' })
  @ApiResponse({ status: 200, description: 'Delete nha ve sinh successfully' })
  async delete(@Param('id') id: number) {
    const result = await this.nhaVeSinhService.delete(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

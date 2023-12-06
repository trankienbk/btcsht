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
  CreateDanhMucNhaChoDto,
  UpdateDanhMucNhaChoDto,
} from '../dtos/danh-muc-nha-cho.dto';
import { DanhMucNhaChoService } from '../service/danh-muc-nha-cho.service';
import ResponseHelper from 'src/utils/ms-response.utli';

@Controller('nha-cho/loai-nha-cho')
@ApiTags('Loại nhà chờ')
export class DanhMucNhaChoController {
  constructor(private danhMucNhaChoService: DanhMucNhaChoService) {}

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
    description: 'Tên loại nhà chờ',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách loại nhà chờ' })
  @ApiResponse({
    status: 200,
    description: 'Get all loai nha cho successfully',
  })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.danhMucNhaChoService.findMany(
      offset,
      limit,
      name,
    );
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy một loại nhà chờ cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Get one loai nha cho successfully',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.danhMucNhaChoService.findOne(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Tạo mới một loại nhà chờ cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Create one loai nha cho successfully',
  })
  async create(@Body() payload: CreateDanhMucNhaChoDto) {
    const result = await this.danhMucNhaChoService.create(payload);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật một loại nhà chờ cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Update one loai nha cho successfully',
  })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateDanhMucNhaChoDto,
  ) {
    const result = await this.danhMucNhaChoService.update(id, payload);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một loại nhà chờ cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Delete one loai nha cho successfully',
  })
  async delete(@Param('id') id: number) {
    const result = await this.danhMucNhaChoService.delete(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }
}

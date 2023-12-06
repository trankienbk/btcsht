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
  CreateDanhMucPanoDto,
  UpdateDanhMucPanoDto,
} from '../dtos/danh-muc-pano.dto';
import { DanhMucPanoService } from '../service/danh-muc-pano.service';
import ResponseHelper from 'src/utils/ms-response.utli';

@Controller('pano/loai-pano')
@ApiTags('Loại pano')
export class DanhMucPanoController {
  constructor(private danhMucPanoService: DanhMucPanoService) {}

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
    description: 'Tên loại pano',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách loại pano' })
  @ApiResponse({
    status: 200,
    description: 'Get all loại pano successfully',
  })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.danhMucPanoService.findMany(offset, limit, name);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy một loại pano cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Get one loại pano successfully',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.danhMucPanoService.findOne(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Tạo mới một loại pano cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Create one loại pano successfully',
  })
  async create(@Body() payload: CreateDanhMucPanoDto) {
    const result = await this.danhMucPanoService.create(payload);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật một loại pano cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Update one loại pano successfully',
  })
  async update(@Param('id') id: any, @Body() payload: UpdateDanhMucPanoDto) {
    const result = await this.danhMucPanoService.update(id, payload);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một loại pano cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Delete one loại pano successfully',
  })
  async delete(@Param('id') id: number) {
    const result = await this.danhMucPanoService.delete(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }
}

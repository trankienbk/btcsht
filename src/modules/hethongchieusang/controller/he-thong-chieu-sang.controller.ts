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
  CreateHeThongChieuSangDto,
  UpdateHeThongChieuSangDto,
} from '../dtos/he-thong-chieu-sang.dto';
import { HeThongChieuSangService } from '../service/he-thong-chieu-sang.service';
import func from '../../../utils/ms-response.utli';
@Controller('he-thong-chieu-sang/doi-tuong')
@ApiTags('Hệ thống chiếu sáng')
export class HeThongChieuSangController {
  constructor(private heThongChieuSangService: HeThongChieuSangService) {}

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
    description: 'Tên hệ thống chiếu sáng',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách hệ thống chiếu sáng' })
  @ApiResponse({
    status: 200,
    description: 'Get all hệ thống chiếu sáng successfully',
  })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.heThongChieuSangService.findMany(
      offset,
      limit,
      name,
    );
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một hệ thống chiếu sáng cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Get he thong chieu sang successfully',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.heThongChieuSangService.findOne(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Thêm mới hệ thống chiếu sáng' })
  @ApiResponse({
    status: 201,
    description: 'Create he thong chieu sang successfully',
  })
  async create(@Body() payload: CreateHeThongChieuSangDto) {
    const result = await this.heThongChieuSangService.create(payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật hệ thống chiếu sáng' })
  @ApiResponse({
    status: 200,
    description: 'Update he thong chieu sang successfully',
  })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateHeThongChieuSangDto,
  ) {
    const result = await this.heThongChieuSangService.update(id, payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá hệ thống chiếu sáng' })
  @ApiResponse({
    status: 200,
    description: 'Delete he thong chieu sang successfully',
  })
  async delete(@Param('id') id: number) {
    const result = await this.heThongChieuSangService.delete(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

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
  CreateDanhMucTuyenBusDto,
  UpdateDanhMucTuyenBusDto,
} from '../dtos/danh-muc-tuyen-bus.dto';
import { DanhMucTuyenBusService } from '../service/danh-muc-tuyen-bus.service';
import ResponseHelper from 'src/utils/ms-response.utli';

@Controller('tuyen-bus/loai-tuyen-bus')
@ApiTags('Loại tuyến buýt')
export class DanhMucTuyenBusController {
  constructor(private danhMucTuyenBusService: DanhMucTuyenBusService) {}

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
    name: 'soHieuTuyenBus',
    required: false,
    description: 'Số hiệu tuyến bus',
    type: 'string',
  })
  @ApiQuery({
    name: 'diemDauCuoi',
    required: false,
    description: 'Điểm đầu cuối',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách vạch sơn' })
  @ApiResponse({ status: 200, description: 'Get all vach son successfully' })
  async findManyDanhMucTuyenBus(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('soHieuTuyenBus') soHieuTuyenBus: string,
    @Query('diemDauCuoi') diemDauCuoi: string,
  ) {
    const result = await this.danhMucTuyenBusService.findAll(
      offset,
      limit,
      soHieuTuyenBus,
      diemDauCuoi,
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
  @ApiOperation({ summary: 'Lấy một tuyến buýt cụ thể' })
  @ApiResponse({ status: 200, description: 'Get one tuyen buyt successfully' })
  async findDanhMucTuyenBusById(@Param('id') id: number) {
    const result = await this.danhMucTuyenBusService.findOneById(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Tạo mới một tuyến buýt cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Create one tuyen buyt successfully',
  })
  async createOneDanhMucTuyenBus(@Body() payload: CreateDanhMucTuyenBusDto) {
    const result = await this.danhMucTuyenBusService.createOne(payload);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật một tuyến buýt cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Update one tuyen buyt successfully',
  })
  async updateOneDanhMucTuyenBus(
    @Param('id') id: number,
    @Body() payload: UpdateDanhMucTuyenBusDto,
  ) {
    const result = await this.danhMucTuyenBusService.updateOne(id, payload);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một tuyến buýt cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Delete one tuyen buyt successfully',
  })
  async softDeleteOneDanhMucTuyenBus(@Param('id') id: number) {
    const result = await this.danhMucTuyenBusService.softDelete(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }
}

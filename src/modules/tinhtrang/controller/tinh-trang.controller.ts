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
import { TinhTrangService } from '../service/tinh-trang.service';
import { CreateTinhTrangDto } from '../dtos/tinh-trang.dto';
import func from '../../../utils/ms-response.utli';

@Controller('tinh-trang/loai-tinh-trang')
@ApiTags('Tình trạng')
export class TinhTrangController {
  constructor(private tinhTrangService: TinhTrangService) {}

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
    name: 'loaiTinhTrangId',
    required: false,
    description: 'Id loại tình trạng',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách tình trạng' })
  @ApiResponse({ status: 200, description: 'Get all tinh trang successfully' })
  async findMany(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('loaiTinhTrangId') loaiTinhTrangId: number,
  ) {
    const result = await this.tinhTrangService.findMany(
      offset,
      limit,
      loaiTinhTrangId,
    );
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một tình trạng cụ thể' })
  @ApiResponse({ status: 200, description: 'Get tinh trang successfully' })
  async findOneById(@Param('id') id: number) {
    const result = await this.tinhTrangService.findOneById(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Tạo mới một tình trạng' })
  @ApiResponse({
    status: 201,
    description: 'Create one tinh trang successfully',
  })
  async createOne(@Body() payload: CreateTinhTrangDto) {
    const result = await this.tinhTrangService.createOne(payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật một tình trạng' })
  @ApiResponse({
    status: 200,
    description: 'Update one tinh trang successfully',
  })
  async updateOne(
    @Param('id') id: number,
    @Body() payload: CreateTinhTrangDto,
  ) {
    const result = await this.tinhTrangService.updateOne(id, payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một tình trạng' })
  @ApiResponse({
    status: 200,
    description: 'Delete one tinh trang successfully',
  })
  async deleteOne(@Param('id') id: number) {
    const result = await this.tinhTrangService.deleteOne(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

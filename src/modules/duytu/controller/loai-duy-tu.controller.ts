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
  CreateLoaiDuyTuDto,
  UpdateLoaiDuyTuDto,
} from '../dtos/loai-duy-tu.dto';
import { LoaiDuyTuService } from '../service/loai-duy-tu.service';
import ResponseHelper from 'src/utils/ms-response.utli';

@Controller('duy-tu/loai-duy-tu')
@ApiTags('Danh mục duy tu')
export class DanhMucDuyTuController {
  constructor(private loaiDuyTuService: LoaiDuyTuService) {}

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
    description: 'Tên duy tu',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách duy tu' })
  @ApiResponse({ status: 200, description: 'Get all duy tu successfully' })
  async findManyLoaiDuyTu(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.loaiDuyTuService.findAll(offset, limit, name);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy một duy tu cụ thể' })
  @ApiResponse({ status: 200, description: 'Get one duy tu successfully' })
  async findLoaiDuyTuById(@Param('id') id: number) {
    const result = await this.loaiDuyTuService.findOneById(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Tạo mới một duy tu' })
  @ApiResponse({ status: 201, description: 'Create one duy tu successfully' })
  async createOneLoaiDuyTu(@Body() payload: CreateLoaiDuyTuDto) {
    const result = await this.loaiDuyTuService.createOne(payload);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật một duy tu' })
  @ApiResponse({ status: 200, description: 'Update one duy tu successfully' })
  async updateOneLoaiDuyTu(
    @Param('id') id: number,
    @Body() payload: UpdateLoaiDuyTuDto,
  ) {
    const result = await this.loaiDuyTuService.updateOne(id, payload);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một duy tu' })
  @ApiResponse({ status: 200, description: 'Delete one duy tu successfully' })
  async softDeleteOneLoaiDuyTu(@Param('id') id: number) {
    const result = await this.loaiDuyTuService.softDelete(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }
}

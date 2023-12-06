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
  CreateDanhMucBienBaoDto,
  UpdateDanhMucBienBaoDto,
} from '../dtos/danh-muc-bien-bao.dto';
import { DanhMucBienBaoService } from '../service/danh-muc-bien-bao.service';
import responeHelper from '../../../utils/ms-response.utli';
@Controller('bien-bao/loai-bien-bao')
@ApiTags('Loại biển Báo')
export class DanhMucBienBaoController {
  constructor(private danhMucBienBaoService: DanhMucBienBaoService) {}

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
    description: 'Tên loại biển báo',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách loại biển báo' })
  @ApiResponse({
    status: 200,
    description: 'Get all loai bien bao successfully',
  })
  async findManyDanhMucBienBao(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.danhMucBienBaoService.findAll(
      offset,
      limit,
      name,
    );
    return responeHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một loại biển báo cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Get one loai bien bao successfully',
  })
  async findDanhMucBienBaoById(@Param('id') id: number) {
    const result = await this.danhMucBienBaoService.findOneById(id);
    return responeHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Thêm mới một loại biển báo' })
  @ApiResponse({
    status: 200,
    description: 'Create one loai bien bao successfully',
  })
  async createOneDanhMucBienBao(@Body() payload: CreateDanhMucBienBaoDto) {
    const result = await this.danhMucBienBaoService.createOne(payload);
    return responeHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật một loại biển báo' })
  @ApiResponse({
    status: 200,
    description: 'Update one loai bien bao successfully',
  })
  async updateOneDanhMucBienBao(
    @Param('id') id: number,
    @Body() payload: UpdateDanhMucBienBaoDto,
  ) {
    const result = await this.danhMucBienBaoService.updateOne(id, payload);
    return responeHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một loại biển báo' })
  @ApiResponse({
    status: 200,
    description: 'Delete one loai bien bao successfully',
  })
  async softDeleteOneDanhMucBienBao(@Param('id') id: number) {
    const result = await this.danhMucBienBaoService.softDelete(id);
    return responeHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }
}

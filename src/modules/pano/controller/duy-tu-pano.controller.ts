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
  CreateDuyTuPanoDto,
  UpdateDuyTuPanoDto,
} from '../dtos/duy-tu-pano.dto';
import { DuyTuPanoService } from '../service/duy-tu-pano.service';
import ResponseHelper from 'src/utils/ms-response.utli';
@Controller('pano/duy-tu')
@ApiTags('Duy tu pano')
export class DuyTuPanoController {
  constructor(private duyTuPanoService: DuyTuPanoService) {}

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
    name: 'panoId',
    required: true,
    description: 'Pano Id',
    type: 'number',
  })
  @ApiOperation({ summary: 'Danh sách duy tu pano' })
  @ApiResponse({
    status: 200,
    description: 'Get all duy tu pano successfully',
  })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('panoId') panoId: number,
  ) {
    const result = await this.duyTuPanoService.findMany(offset, limit, panoId);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy một duy tu pano' })
  @ApiResponse({
    status: 200,
    description: 'Get one duy tu pano successfully',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.duyTuPanoService.findOne(id);
    return result;
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Tạo mới một duy tu pano' })
  @ApiResponse({
    status: 200,
    description: 'Create one duy tu pano successfully',
  })
  async create(@Body() payload: CreateDuyTuPanoDto) {
    const result = await this.duyTuPanoService.create(payload);
    return result;
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Sửa đổi một duy tu pano' })
  @ApiResponse({
    status: 200,
    description: 'Update one duy tu pano successfully',
  })
  async update(@Param('id') id: number, @Body() payload: UpdateDuyTuPanoDto) {
    const result = await this.duyTuPanoService.update(id, payload);
    return result;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một duy tu pano' })
  @ApiResponse({
    status: 200,
    description: 'Delete one duy tu pano successfully',
  })
  async delete(@Param('id') id: number) {
    const result = await this.duyTuPanoService.delete(id);
    return result;
  }
}

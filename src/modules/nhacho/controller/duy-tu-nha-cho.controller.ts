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
  CreateDuyTuNhaChoDto,
  UpdateDuyTuNhaChoDto,
} from '../dtos/duy-tu-nha-cho.dto';
import { DuyTuNhaChoService } from '../service/duy-tu-nha-cho.service';
import ResponseHelper from 'src/utils/ms-response.utli';
@Controller('nha-cho/duy-tu')
@ApiTags('Duy tu nhà chờ')
export class DuyTuNhaChoController {
  constructor(private duyTuNhaChoService: DuyTuNhaChoService) {}

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
    name: 'nhaChoId',
    required: true,
    description: 'Điểm dừng Id',
    type: 'number',
  })
  @ApiOperation({ summary: 'Danh sách duy tu nhà chờ' })
  @ApiResponse({
    status: 200,
    description: 'Get all duy tu nha cho successfully',
  })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('nhaChoId') nhaChoId: number,
  ) {
    const result = await this.duyTuNhaChoService.findMany(
      offset,
      limit,
      nhaChoId,
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
  @ApiOperation({ summary: 'Lấy một duy tu nhà chờ' })
  @ApiResponse({
    status: 200,
    description: 'Get one duy tu nha cho successfully',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.duyTuNhaChoService.findOne(id);
    return result;
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Tạo mới một duy tu nhà chờ' })
  @ApiResponse({
    status: 201,
    description: 'Create one duy tu nha cho successfully',
  })
  async create(@Body() payload: CreateDuyTuNhaChoDto) {
    const result = await this.duyTuNhaChoService.create(payload);
    return result;
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Sửa đổi một duy tu nhà chờ' })
  @ApiResponse({
    status: 200,
    description: 'Update one duy tu nha cho successfully',
  })
  async update(@Param('id') id: number, @Body() payload: UpdateDuyTuNhaChoDto) {
    const result = await this.duyTuNhaChoService.update(id, payload);
    return result;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một duy tu nhà chờ' })
  @ApiResponse({
    status: 200,
    description: 'Delete one duy tu nha cho successfully',
  })
  async delete(@Param('id') id: number) {
    const result = await this.duyTuNhaChoService.delete(id);
    return result;
  }
}

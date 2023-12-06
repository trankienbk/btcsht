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
  CreateDuyTuDiemDungDto,
  UpdateDuyTuDiemDungDto,
} from '../dtos/duy-tu-diem-dung.dto';
import { DuyTuDiemDungService } from '../service/duy-tu-diem-dung.service';
import ResponseHelper from 'src/utils/ms-response.utli';
@Controller('diem-dung/duy-tu')
@ApiTags('Duy tu điểm dừng')
export class DuyTuDiemDungController {
  constructor(private duyTuDiemDungService: DuyTuDiemDungService) {}

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
    name: 'diemDungId',
    required: true,
    description: 'Điểm dừng Id',
    type: 'number',
  })
  @ApiOperation({ summary: 'Danh sách duy tu điểm dừng' })
  @ApiResponse({
    status: 200,
    description: 'Get all duy tu diem dung successfully',
  })
  async findManyDuyTuDiemDung(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('diemDungId') diemDungId: number,
  ) {
    const result = await this.duyTuDiemDungService.findAll(
      offset,
      limit,
      diemDungId,
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
  @ApiOperation({ summary: 'Lấy một duy tu điểm dừng' })
  @ApiResponse({
    status: 200,
    description: 'Get one duy tu diem dung successfully',
  })
  async findDuyTuDiemDungById(@Param('id') id: number) {
    const result = await this.duyTuDiemDungService.findOneById(id);
    return result;
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Tạo mới một duy tu điểm dừng' })
  @ApiResponse({
    status: 200,
    description: 'Create one duy tu diem dung successfully',
  })
  async createOneDuyTuDiemDung(@Body() payload: CreateDuyTuDiemDungDto) {
    const result = await this.duyTuDiemDungService.createOne(payload);
    return result;
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Sửa đổi một duy tu điểm dừng' })
  @ApiResponse({
    status: 200,
    description: 'Update one duy tu diem dung successfully',
  })
  async updateOneDuyTuDiemDung(
    @Param('id') id: number,
    @Body() payload: UpdateDuyTuDiemDungDto,
  ) {
    const result = await this.duyTuDiemDungService.updateOne(id, payload);
    return result;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một duy tu điểm dừng' })
  @ApiResponse({
    status: 200,
    description: 'Delete one duy tu diem dung successfully',
  })
  async softDeleteOneDuyTuDiemDung(@Param('id') id: number) {
    const result = await this.duyTuDiemDungService.softDelete(id);
    return result;
  }
}

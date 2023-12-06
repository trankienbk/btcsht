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
import { UpdateDiemDungDto } from '../dtos/diem-dung.dto';
import { IDiemDung } from 'giao-thong-backend/src/modules/diemdung/interface/diem-dung.interface';
import { DiemDungService } from '../service/diem-dung.service';
import ResponseHelper from 'src/utils/ms-response.utli';
@Controller('diem-dung/doi-tuong')
@ApiTags('Điểm dừng')
export class DiemDungController {
  constructor(private diemDungService: DiemDungService) { }

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
    description: 'Tên điểm dừng',
    type: 'string',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Loại điểm dừng id',
    type: 'number',
  })
  @ApiQuery({
    name: 'department',
    required: false,
    description: 'Đơn vị quản lý id',
    type: 'number',
  })
  @ApiOperation({ summary: 'Danh sách điểm dừng' })
  @ApiResponse({ status: 200, description: 'Get all diem dung successfully' })
  async findManyDanhMucNhaCho(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('name') name: string,
    @Query('type') type: number,
    @Query('department') department: number,
  ) {
    const result = await this.diemDungService.findAll(
      offset,
      limit,
      name,
      type,
      department,
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
  @ApiOperation({ summary: 'Lấy một điểm dừng cụ thể' })
  @ApiResponse({ status: 200, description: 'Get one diem dung successfully' })
  async findDanhMucNhaChoById(@Param('id') id: number) {
    const result = await this.diemDungService.findOneById(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Tạo mới một điểm dừng cụ thể' })
  @ApiResponse({
    status: 201,
    description: 'Create one diem dung successfully',
  })
  async createOneDanhMucNhaCho(@Body() payload: IDiemDung) {
    const result = await this.diemDungService.createOne(payload);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật một điểm dừng cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Update one diem dung successfully',
  })
  async updateOneDanhMucNhaCho(
    @Param('id') id: number,
    @Body() payload: UpdateDiemDungDto,
  ) {
    const result = await this.diemDungService.updateOne(id, payload);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một điểm dừng cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Delete one diem dung successfully',
  })
  async softDeleteOneDanhMucNhaCho(@Param('id') id: number) {
    const result = await this.diemDungService.softDelete(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }
}

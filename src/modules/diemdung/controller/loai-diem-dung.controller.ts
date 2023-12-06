import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/sys/auth/guards/auth.guard';
import { DanhMucDiemDungService } from '../service/loai-diem-dung.service';
import { UpdateDiemDungParentDto } from '../dtos/loai-diem-dung.dto';
import ResponseHelper from 'src/utils/ms-response.utli';

@Controller('diem-dung/loai-diem-dung')
@ApiTags('Loại điểm dừng')
export class DanhMucDiemDungController {
  constructor(private diemDungService: DanhMucDiemDungService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Danh sách loại điểm dừng' })
  @ApiResponse({
    status: 200,
    description: 'Get all loai diem dung successfully',
  })
  async getAllDiemDung() {
    const result = await this.diemDungService.findAllDiemDung();
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Get('/doi-tuong')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Danh sách đối tượng điểm dừng' })
  @ApiResponse({
    status: 200,
    description: 'Get all doi tuong diem dung successfully',
  })
  async getAllDoiTuong() {
    const result = await this.diemDungService.findAllDoiTuong();
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Get('/doi-tuong/cau-hinh/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Danh sách loại điểm dừng cấu hình' })
  @ApiResponse({
    status: 200,
    description: 'Get all loai diem dung cau hinh successfully',
  })
  async getAllDoiTuongCauHinh(@Param('id') id: number) {
    const result = await this.diemDungService.findAllDoiTuongCauHinh(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Patch('/doi-tuong/cau-hinh')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Chỉnh sửa loại điểm dừng cấu hình' })
  @ApiResponse({
    status: 200,
    description: 'Update loai diem dung cau hinh successfully',
  })
  async updateDiemDungCauHinh(
    @Body()
    payload: UpdateDiemDungParentDto,
  ) {
    const result = await this.diemDungService.updateDiemDungCauHinh(payload);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/sys/auth/guards/auth.guard';
import func from '../../../utils/ms-response.utli';
import { LoaiTinhTrangService } from '../service/loai-tinh-trang.service';

@Controller('tinh-trang/subtype-tinh-trang')
@ApiTags('Loại tình trạng')
export class LoaiTinhTrangController {
  constructor(private loaiTinhTrangService: LoaiTinhTrangService) {}
  @Get('')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra tất cả loại tình trạng' })
  @ApiResponse({
    status: 200,
    description: 'Get all loai tinh trang successfully',
  })
  async findManyLoaiTinhTrang() {
    const result = await this.loaiTinhTrangService.findManyLoaiTinhTrang();
    return func.response(result.statusCode, result.message, result.data);
  }
}

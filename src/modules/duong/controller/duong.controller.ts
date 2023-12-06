import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/sys/auth/guards/auth.guard';
import func from '../../../utils/ms-response.utli';
import { DuongService } from '../service/duong.service';
@Controller('duong')
@ApiTags('Đường')
export class DuongController {
  constructor(private duongService: DuongService) {}

  @Get('')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Danh sách đường' })
  @ApiResponse({ status: 200, description: 'Get list road successfully' })
  async getManyDuong() {
    const result = await this.duongService.findMany();
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy dữ liệu một đường cụ thể' })
  @ApiResponse({ status: 200, description: 'Get one road successfully' })
  async getDuongById(@Param('id') id: number) {
    const result = await this.duongService.findOne(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

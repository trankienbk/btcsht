import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/sys/auth/guards/auth.guard';
import { ViTriService } from '../service/vi-tri.service';
import ResponseHelper from 'src/utils/ms-response.utli';

@Controller('vi-tri')
@ApiTags('Vị trí')
export class ViTriController {
  constructor(private viTriService: ViTriService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiQuery({
    name: 'isDisplay',
    required: false,
    description: 'Phân loại hiển thị vị trí',
    type: 'number',
  })
  @ApiOperation({ summary: 'Danh sách vị trí' })
  @ApiResponse({ status: 200, description: 'Get all vi tri successfully' })
  async findManyDanhMucVachSon(@Query('isDisplay') isDisplay: number | null) {
    const result = await this.viTriService.findAll(isDisplay);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }
}

import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/sys/auth/guards/auth.guard';
import { ThanhPhanService } from '../service/thanh-phan.service';
import ResponseHelper from 'src/utils/ms-response.utli';

@Controller('thanh-phan')
@ApiTags('Thành phần')
export class ThanhPhanController {
  constructor(private thanhPhanService: ThanhPhanService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiQuery({
    name: 'code',
    required: true,
    description: 'Phân loại hiển thị thành phần',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách thành phần' })
  @ApiResponse({ status: 200, description: 'Get all thanh phan successfully' })
  async findMany(@Query('code') code: string) {
    const result = await this.thanhPhanService.findAll(code);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }
}

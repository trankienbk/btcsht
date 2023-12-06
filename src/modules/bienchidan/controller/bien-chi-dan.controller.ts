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
  CreateBienChiDanDto,
  UpdateBienChiDanDto,
} from '../dtos/bien-chi-dan.dto';
import { BienChiDanService } from '../service/bien-chi-dan.service';
import func from '../../../utils/ms-response.utli';
@Controller('bien-chi-dan/doi-tuong')
@ApiTags('Biển chỉ dẫn')
export class BienChiDanController {
  constructor(private bienChiDanService: BienChiDanService) {}

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
    description: 'Tên biển chỉ dẫn',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách biển chỉ dẫn' })
  @ApiResponse({
    status: 200,
    description: 'Get all bien chi dan successfully',
  })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.bienChiDanService.findMany(offset, limit, name);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một biển chỉ dẫn cụ thể' })
  @ApiResponse({ status: 200, description: 'Get bien chi dan successfully' })
  async findOne(@Param('id') id: number) {
    const result = await this.bienChiDanService.findOne(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Thêm mới biển chỉ dẫn' })
  @ApiResponse({ status: 201, description: 'Create bien chi dan successfully' })
  async create(@Body() payload: CreateBienChiDanDto) {
    const result = await this.bienChiDanService.create(payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật biển chỉ dẫn' })
  @ApiResponse({ status: 200, description: 'Update bien chi dan successfully' })
  async update(@Param('id') id: number, @Body() payload: UpdateBienChiDanDto) {
    const result = await this.bienChiDanService.update(id, payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá biển chỉ dẫn' })
  @ApiResponse({ status: 200, description: 'Delete bien chi dan successfully' })
  async delete(@Param('id') id: number) {
    const result = await this.bienChiDanService.delete(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

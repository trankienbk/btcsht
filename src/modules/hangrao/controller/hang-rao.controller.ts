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
import { CreateHangRaoDto, UpdateHangRaoDto } from '../dtos/hang-rao.dto';
import { HangRaoService } from '../service/hang-rao.service';
import func from '../../../utils/ms-response.utli';
@Controller('hang-rao/doi-tuong')
@ApiTags('Hàng rào')
export class HangRaoController {
  constructor(private hangRaoService: HangRaoService) {}

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
    description: 'Tên hàng rào',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách hàng rào' })
  @ApiResponse({ status: 200, description: 'Get all hàng rào successfully' })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.hangRaoService.findMany(offset, limit, name);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một hàng rào cụ thể' })
  @ApiResponse({ status: 200, description: 'Get cay xanh successfully' })
  async findOne(@Param('id') id: number) {
    const result = await this.hangRaoService.findOne(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Thêm mới hàng rào' })
  @ApiResponse({ status: 201, description: 'Create cay xanh successfully' })
  async create(@Body() payload: CreateHangRaoDto) {
    const result = await this.hangRaoService.create(payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật hàng rào' })
  @ApiResponse({ status: 200, description: 'Update cay xanh successfully' })
  async update(@Param('id') id: number, @Body() payload: UpdateHangRaoDto) {
    const result = await this.hangRaoService.update(id, payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá hàng rào' })
  @ApiResponse({ status: 200, description: 'Delete cay xanh successfully' })
  async delete(@Param('id') id: number) {
    const result = await this.hangRaoService.delete(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

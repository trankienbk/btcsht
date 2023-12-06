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
import { CreateHeNoiBoDto, UpdateHeNoiBoDto } from '../dtos/he-noi-bo.dto';
import { HeNoiBoService } from '../service/he-noi-bo.service';
import func from '../../../utils/ms-response.utli';
@Controller('he-noi-bo/doi-tuong')
@ApiTags('Hè nội bộ')
export class HeNoiBoController {
  constructor(private heNoiBoService: HeNoiBoService) {}

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
    description: 'Tên hè nội bộ',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách hè nội bộ' })
  @ApiResponse({ status: 200, description: 'Get all hè nội bộ successfully' })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.heNoiBoService.findMany(offset, limit, name);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một hè nội bộ cụ thể' })
  @ApiResponse({ status: 200, description: 'Get cay xanh successfully' })
  async findOne(@Param('id') id: number) {
    const result = await this.heNoiBoService.findOne(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Thêm mới hè nội bộ' })
  @ApiResponse({ status: 201, description: 'Create cay xanh successfully' })
  async create(@Body() payload: CreateHeNoiBoDto) {
    const result = await this.heNoiBoService.create(payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật hè nội bộ' })
  @ApiResponse({ status: 200, description: 'Update cay xanh successfully' })
  async update(@Param('id') id: number, @Body() payload: UpdateHeNoiBoDto) {
    const result = await this.heNoiBoService.update(id, payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá hè nội bộ' })
  @ApiResponse({ status: 200, description: 'Delete cay xanh successfully' })
  async delete(@Param('id') id: number) {
    const result = await this.heNoiBoService.delete(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

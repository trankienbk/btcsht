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
import { CreateCayXanhDto, UpdateCayXanhDto } from '../dtos/cay-xanh.dto';
import { CayXanhService } from '../service/cay-xanh.service';
import func from '../../../utils/ms-response.utli';
@Controller('cay-xanh/doi-tuong')
@ApiTags('Cây xanh')
export class CayXanhController {
  constructor(private cayXanhService: CayXanhService) {}

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
    description: 'Tên cây xanh',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách cây xanh' })
  @ApiResponse({ status: 200, description: 'Get all cay xanh successfully' })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.cayXanhService.findMany(offset, limit, name);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một cây xanh cụ thể' })
  @ApiResponse({ status: 200, description: 'Get cay xanh successfully' })
  async findOne(@Param('id') id: number) {
    const result = await this.cayXanhService.findOne(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Thêm mới cây xanh' })
  @ApiResponse({ status: 201, description: 'Create cay xanh successfully' })
  async create(@Body() payload: CreateCayXanhDto) {
    const result = await this.cayXanhService.create(payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật cây xanh' })
  @ApiResponse({ status: 200, description: 'Update cay xanh successfully' })
  async update(@Param('id') id: number, @Body() payload: UpdateCayXanhDto) {
    const result = await this.cayXanhService.update(id, payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá cây xanh' })
  @ApiResponse({ status: 200, description: 'Delete cay xanh successfully' })
  async delete(@Param('id') id: number) {
    const result = await this.cayXanhService.delete(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

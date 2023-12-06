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
  CreateNhaDieuHanhDto,
  UpdateNhaDieuHanhDto,
} from '../dtos/nha-dieu-hanh.dto';
import { NhaDieuHanhService } from '../service/nha-dieu-hanh.service';
import func from '../../../utils/ms-response.utli';
@Controller('nha-dieu-hanh/doi-tuong')
@ApiTags('Nhà điều hành')
export class NhaDieuHanhController {
  constructor(private nhaDieuHanhService: NhaDieuHanhService) {}

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
    description: 'Tên nhà điều hành',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách nhà điều hành' })
  @ApiResponse({
    status: 200,
    description: 'Get all nhà điều hành successfully',
  })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.nhaDieuHanhService.findMany(offset, limit, name);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một nhà điều hành cụ thể' })
  @ApiResponse({ status: 200, description: 'Get nha dieu hanh successfully' })
  async findOne(@Param('id') id: number) {
    const result = await this.nhaDieuHanhService.findOne(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Thêm mới nhà điều hành' })
  @ApiResponse({
    status: 201,
    description: 'Create nha dieu hanh successfully',
  })
  async create(@Body() payload: CreateNhaDieuHanhDto) {
    const result = await this.nhaDieuHanhService.create(payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật nhà điều hành' })
  @ApiResponse({
    status: 200,
    description: 'Update nha dieu hanh successfully',
  })
  async update(@Param('id') id: number, @Body() payload: UpdateNhaDieuHanhDto) {
    const result = await this.nhaDieuHanhService.update(id, payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá nhà điều hành' })
  @ApiResponse({
    status: 200,
    description: 'Delete nha dieu hanh successfully',
  })
  async delete(@Param('id') id: number) {
    const result = await this.nhaDieuHanhService.delete(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

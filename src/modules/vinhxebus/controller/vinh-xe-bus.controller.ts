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
  CreateVinhXeBusDto,
  UpdateVinhXeBusDto,
} from '../dtos/vinh-xe-bus.dto';
import { VinhXeBusService } from '../service/vinh-xe-bus.service';
import func from '../../../utils/ms-response.utli';
@Controller('vinh-xe-bus/doi-tuong')
@ApiTags('Vịnh xe buýt')
export class VinhXeBusController {
  constructor(private vinhXeBusService: VinhXeBusService) {}

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
    description: 'Tên vịnh xe buýt',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách vịnh xe buýt' })
  @ApiResponse({
    status: 200,
    description: 'Get all vịnh xe buýt successfully',
  })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.vinhXeBusService.findMany(offset, limit, name);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một vịnh xe buýt cụ thể' })
  @ApiResponse({ status: 200, description: 'Get cay xanh successfully' })
  async findOne(@Param('id') id: number) {
    const result = await this.vinhXeBusService.findOne(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Thêm mới vịnh xe buýt' })
  @ApiResponse({ status: 201, description: 'Create cay xanh successfully' })
  async create(@Body() payload: CreateVinhXeBusDto) {
    const result = await this.vinhXeBusService.create(payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật vịnh xe buýt' })
  @ApiResponse({ status: 200, description: 'Update cay xanh successfully' })
  async update(@Param('id') id: number, @Body() payload: UpdateVinhXeBusDto) {
    const result = await this.vinhXeBusService.update(id, payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá vịnh xe buýt' })
  @ApiResponse({ status: 200, description: 'Delete cay xanh successfully' })
  async delete(@Param('id') id: number) {
    const result = await this.vinhXeBusService.delete(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

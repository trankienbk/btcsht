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
import { CreateDistrictDto, UpdateDistrictDto } from '../dtos/district.dto';
import { DistrictService } from '../service/district.service';
import func from '../../../utils/ms-response.utli';
@Controller('quan-huyen')
@ApiTags('Quận huyện')
export class DistrictController {
  constructor(private districtService: DistrictService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Offset param',
    type: 'number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit param',
    type: 'number',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Name param',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách quận huyện' })
  @ApiResponse({ status: 200, description: 'Get all Quan successfully' })
  async findAll(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.districtService.findAll(offset, limit, name);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một quận huyện cụ thể' })
  @ApiResponse({ status: 200, description: 'Get Quan successfully' })
  async findOneById(@Param('id') id: number) {
    const result = await this.districtService.findOneById(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Thêm mới một quận huyện' })
  @ApiResponse({ status: 201, description: 'Create Quan successfully' })
  async createOne(@Body() payload: CreateDistrictDto) {
    const result = await this.districtService.createOne(payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật một quận huyện' })
  @ApiResponse({ status: 200, description: 'Update Quan successfully' })
  async updateOne(@Param('id') id: number, @Body() payload: UpdateDistrictDto) {
    const result = await this.districtService.updateOne(id, payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một quận huyện' })
  @ApiResponse({ status: 200, description: 'Delete Quan successfully' })
  async deleteOne(@Param('id') id: number) {
    const result = await this.districtService.deleteOne(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

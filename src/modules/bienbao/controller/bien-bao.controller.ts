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
  CreateDanhMucBienBaoDto,
  UpdateDanhMucBienBaoDto,
} from '../dtos/danh-muc-bien-bao.dto';
import { DanhMucBienBaoService } from '../service/danh-muc-bien-bao.service';
import func from '../../../utils/ms-response.utli';
@Controller('bien-bao/doi-tuong')
@ApiTags('Biển Báo')
export class BienBaoController {
  constructor(private bienBaoService: DanhMucBienBaoService) {}

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
  @ApiOperation({ summary: 'Danh sách biển báo' })
  @ApiResponse({
    status: 200,
    description: 'Get all bien bao successfully',
  })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.bienBaoService.findAll(offset, limit, name);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một biển báo cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Get one bien bao successfully',
  })
  async findById(@Param('id') id: number) {
    const result = await this.bienBaoService.findOneById(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Thêm mới một biển báo' })
  @ApiResponse({
    status: 200,
    description: 'Create one bien bao successfully',
  })
  async createOne(@Body() payload: CreateDanhMucBienBaoDto) {
    const result = await this.bienBaoService.createOne(payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật một biển báo' })
  @ApiResponse({
    status: 200,
    description: 'Update one bien bao successfully',
  })
  async updateOne(
    @Param('id') id: number,
    @Body() payload: UpdateDanhMucBienBaoDto,
  ) {
    const result = await this.bienBaoService.updateOne(id, payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một biển báo' })
  @ApiResponse({
    status: 200,
    description: 'Delete one loai bien bao successfully',
  })
  async softDeleteOne(@Param('id') id: number) {
    const result = await this.bienBaoService.softDelete(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

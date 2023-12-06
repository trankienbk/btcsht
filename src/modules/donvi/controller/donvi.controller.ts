import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DonviService } from '../service/donvi.service';
import { AuthGuard } from 'src/modules/sys/auth/guards/auth.guard';
import { CreateDonViDto, UpdateDonViDto } from '../dtos/donvi.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import func from '../../../utils/ms-response.utli';
@Controller('don-vi')
@ApiTags('Đơn vị')
export class DonviController {
  constructor(private donViService: DonviService) {}

  @Get('/list')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Danh sách phẳng đơn vị' })
  @ApiResponse({ status: 200, description: 'Get all list don vi successfully' })
  async getManyDonVi() {
    const result = await this.donViService.findMany();
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/tree')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Danh sách cây đơn vị' })
  @ApiResponse({ status: 200, description: 'Get all tree don vi successfully' })
  async getDonViByTree() {
    const result = await this.donViService.getTree();
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy dữ liệu một đơn vị cụ thể' })
  @ApiResponse({ status: 200, description: 'Get one don vi successfully' })
  async getDonViById(@Param('id') id: number) {
    const result = await this.donViService.findOne(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Tạo mới một đơn vị' })
  @ApiResponse({ status: 201, description: 'Create one don vi successfully' })
  async createOneDonVi(@Body() payload: CreateDonViDto) {
    const result = await this.donViService.createOne(payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Chỉnh sửa một đơn vị' })
  @ApiResponse({ status: 200, description: 'Update one don vi successfully' })
  async updateOneDonVi(
    @Param('id') id: number,
    @Body() payload: UpdateDonViDto,
  ) {
    const result = await this.donViService.updateOne(id, payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một đơn vị' })
  @ApiResponse({ status: 200, description: 'Delete one don vi successfully' })
  async softDeleteOneDonVi(@Param('id') id: number) {
    const result = await this.donViService.delete(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

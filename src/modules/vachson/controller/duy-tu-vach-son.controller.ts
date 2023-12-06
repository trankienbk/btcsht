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
  CreateDuyTuVachSonDto,
  UpdateDuyTuVachSonDto,
} from '../dtos/duy-tu-vach-son.dto';
import { DuyTuVachSonService } from '../service/duy-tu-vach-son.service';
import ResponseHelper from 'src/utils/ms-response.utli';
@Controller('vach-son/duy-tu')
@ApiTags('duy tu vạch sơn')
export class DuyTuVachSonController {
  constructor(private duyTuVachSonService: DuyTuVachSonService) {}

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
    name: 'vachSonId',
    required: true,
    description: 'Vạch sơn Id',
    type: 'number',
  })
  @ApiOperation({ summary: 'Danh sách duy tu vạch sơn' })
  @ApiResponse({
    status: 200,
    description: 'Get all duy tu vach son successfully',
  })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('vachSonId') vachSonId: number,
  ) {
    const result = await this.duyTuVachSonService.findMany(
      offset,
      limit,
      vachSonId,
    );
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy một duy tu vạch sơn' })
  @ApiResponse({
    status: 200,
    description: 'Get one duy tu vach son successfully',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.duyTuVachSonService.findOne(id);
    return result;
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Tạo mới một duy tu vạch sơn' })
  @ApiResponse({
    status: 200,
    description: 'Create one duy tu vach son successfully',
  })
  async create(@Body() payload: CreateDuyTuVachSonDto) {
    const result = await this.duyTuVachSonService.create(payload);
    return result;
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Sửa đổi một duy tu vạch sơn' })
  @ApiResponse({
    status: 200,
    description: 'Update one duy tu vach son successfully',
  })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateDuyTuVachSonDto,
  ) {
    const result = await this.duyTuVachSonService.update(id, payload);
    return result;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một duy tu vạch sơn' })
  @ApiResponse({
    status: 200,
    description: 'Delete one duy tu vach son successfully',
  })
  async delete(@Param('id') id: number) {
    const result = await this.duyTuVachSonService.delete(id);
    return result;
  }
}

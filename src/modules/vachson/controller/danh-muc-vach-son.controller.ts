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
  CreateDanhMucVachSonDto,
  UpdateDanhMucVachSonDto,
} from '../dtos/danh-muc-vach-son.dto';
import { DanhMucVachSonService } from '../service/danh-muc-vach-son.service';
import ResponseHelper from 'src/utils/ms-response.utli';

@Controller('vach-son/loai-vach-son')
@ApiTags('Loại vạch sơn')
export class DanhMucVachSonController {
  constructor(private danhMucVachSonService: DanhMucVachSonService) {}

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
    description: 'Tên loại vạch sơn',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách loại vạch sơn' })
  @ApiResponse({
    status: 200,
    description: 'Get all loại vach son successfully',
  })
  async findManyDanhMucVachSon(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.danhMucVachSonService.findAll(
      offset,
      limit,
      name,
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
  @ApiOperation({ summary: 'Lấy một loại vạch sơn cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Get one loại vach son successfully',
  })
  async findDanhMucVachSonById(@Param('id') id: number) {
    const result = await this.danhMucVachSonService.findOneById(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Tạo mới một loại vạch sơn cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Create one loại vach son successfully',
  })
  async createOneDanhMucVachSon(@Body() payload: CreateDanhMucVachSonDto) {
    const result = await this.danhMucVachSonService.createOne(payload);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật một loại vạch sơn cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Update one loại vach son successfully',
  })
  async updateOneDanhMucVachSon(
    @Param('id') id: any,
    @Body() payload: UpdateDanhMucVachSonDto,
  ) {
    const result = await this.danhMucVachSonService.updateOne(id, payload);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một loại vạch sơn cụ thể' })
  @ApiResponse({
    status: 200,
    description: 'Delete one loại vach son successfully',
  })
  async softDeleteOneDanhMucVachSon(@Param('id') id: number) {
    const result = await this.danhMucVachSonService.softDelete(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }
}

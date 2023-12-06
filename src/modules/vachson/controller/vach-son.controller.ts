import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/sys/auth/guards/auth.guard';
import ResponseHelper from 'src/utils/ms-response.utli';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateVachSonDto, UpdateVachSonDto } from '../dtos/vach-son.dto';
import { VachSonService } from '../service/vach-son.service';

@Controller('vach-son/doi-tuong')
@ApiTags('Vạch sơn')
export class VachSonController {
  constructor(private vachSonService: VachSonService) {}

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
  @ApiOperation({ summary: 'Danh sách vạch sơn' })
  @ApiResponse({ status: 200, description: 'Get all vach son successfully' })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.vachSonService.findAll(offset, limit, name);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy một vạch sơn cụ thể' })
  @ApiResponse({ status: 200, description: 'Get one vach son successfully' })
  async findOne(@Param('id') id: number) {
    const result = await this.vachSonService.findOne(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Tạo mới một vạch sơn cụ thể' })
  @ApiResponse({ status: 200, description: 'Create one vach son successfully' })
  async create(
    @Body() data: CreateVachSonDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // handle file here
    console.log(file);
    const idFile = [1, 2, 3];
    // then pass file id as array of number to function

    const result = await this.vachSonService.create(data, idFile);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Cập nhật một vạch sơn cụ thể' })
  @ApiResponse({ status: 200, description: 'Update one vach son successfully' })
  async update(
    @Param('id') id: number,
    @Body() data: UpdateVachSonDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // handle file here
    console.log(file);
    const idFile = [1, 2, 3];
    // then pass file id as array of number to function

    const result = await this.vachSonService.update(id, data, idFile);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một vạch sơn cụ thể' })
  @ApiResponse({ status: 200, description: 'Delete one vach son successfully' })
  async delete(@Param('id') id: number) {
    const result = await this.vachSonService.delete(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }
}

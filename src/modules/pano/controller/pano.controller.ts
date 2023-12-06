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
import { CreatePanoDto, UpdatePanoDto } from '../dtos/pano.dto';
import { PanoService } from '../service/pano.service';

@Controller('pano/doi-tuong')
@ApiTags('Pano')
export class PanoController {
  constructor(private panoService: PanoService) {}

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
    description: 'Tên loại pano',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách pano' })
  @ApiResponse({ status: 200, description: 'Get all pano successfully' })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.panoService.findAll(offset, limit, name);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy một pano cụ thể' })
  @ApiResponse({ status: 200, description: 'Get one pano successfully' })
  async findOne(@Param('id') id: number) {
    const result = await this.panoService.findOne(id);
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
  @ApiOperation({ summary: 'Tạo mới một pano cụ thể' })
  @ApiResponse({ status: 200, description: 'Create one pano successfully' })
  async create(
    @Body() data: CreatePanoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // handle file here
    console.log(file);
    const idFile = [1, 2, 3];
    // then pass file id as array of number to function

    const result = await this.panoService.create(data, idFile);
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
  @ApiOperation({ summary: 'Cập nhật một pano cụ thể' })
  @ApiResponse({ status: 200, description: 'Update one pano successfully' })
  async update(
    @Param('id') id: number,
    @Body() data: UpdatePanoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // handle file here
    console.log(file);
    const idFile = [1, 2, 3];
    // then pass file id as array of number to function

    const result = await this.panoService.update(id, data, idFile);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một pano cụ thể' })
  @ApiResponse({ status: 200, description: 'Delete one pano successfully' })
  async delete(@Param('id') id: number) {
    const result = await this.panoService.delete(id);
    return ResponseHelper.response(
      result.statusCode,
      result.message,
      result.data,
    );
  }
}

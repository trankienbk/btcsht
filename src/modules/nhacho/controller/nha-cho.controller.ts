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
import func from '../../../utils/ms-response.utli';
import { NhaChoService } from '../service/nha-cho.service';
import { CreateNhaChoDto, UpdateNhaChoDto } from '../dtos/nha-cho.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('nha-cho/doi-tuong')
@ApiTags('Nhà chờ')
export class NhaChoController {
  constructor(private nhachoService: NhaChoService) {}

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
    description: 'Tên nhà chờ',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách nhà chờ' })
  @ApiResponse({ status: 200, description: 'Get all Nha cho successfully' })
  async findMany(
    @Query('offset') offset: number | null,
    @Query('limit') limit: number | null,
    @Query('name') name: string | null,
  ) {
    const result = await this.nhachoService.findMany(offset, limit, name);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một nhà chờ cụ thể' })
  @ApiResponse({ status: 200, description: 'Get Nha cho successfully' })
  async findOne(@Param('id') id: number) {
    const result = await this.nhachoService.findOne(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Thêm mới một nhà chờ' })
  @ApiResponse({ status: 201, description: 'Create Nha cho successfully' })
  async create(
    @Body() payload: CreateNhaChoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // handle file here
    console.log(file);
    const idFile = [1, 2, 3];
    // then pass file id as array of number to function

    const result = await this.nhachoService.create(payload, idFile);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật một nhà chờ' })
  @ApiResponse({ status: 200, description: 'Update Nha cho successfully' })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateNhaChoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // handle file here
    console.log(file);
    const idFile = [1, 2, 3];
    // then pass file id as array of number to function
    const result = await this.nhachoService.update(id, payload, idFile);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một nhà chờ' })
  @ApiResponse({ status: 200, description: 'Delete Nha cho successfully' })
  async delete(@Param('id') id: number) {
    const result = await this.nhachoService.delete(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

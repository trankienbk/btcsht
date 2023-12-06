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
import func from '../../../../utils/ms-response.utli';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CreateAccountDto, UpdateAccountDto } from '../dtos/account.dto';
import { AccountService } from '../service/account.service';

@Controller('account')
@ApiTags('Tài khoản')
export class AccountController {
  constructor(private accountService: AccountService) {}

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
    name: 'username',
    required: false,
    description: 'username param',
    type: 'string',
  })
  @ApiQuery({
    name: 'fullname',
    required: false,
    description: 'fullname param',
    type: 'string',
  })
  @ApiQuery({
    name: 'donViId',
    required: false,
    description: 'Don vi Id param',
    type: 'string',
  })
  @ApiOperation({ summary: 'Danh sách tài khoản' })
  @ApiResponse({ status: 200, description: 'Get all Account successfully' })
  async getAllAccounts(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('username') username: string,
    @Query('fullname') fullname: string,
    @Query('donViId') donViId: string,
  ) {
    const result = await this.accountService.findAll(
      offset,
      limit,
      username,
      fullname,
      donViId,
    );
    return func.response(result.statusCode, result.message, result.data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Lấy ra một tài khoản cụ thể' })
  @ApiResponse({ status: 200, description: 'Get Account successfully' })
  async getAccountById(@Param('id') id: number) {
    const result = await this.accountService.findOneById(id);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Thêm mới một tài khoản' })
  @ApiResponse({ status: 201, description: 'Create Account successfully' })
  async register(@Body() payload: CreateAccountDto) {
    const result = await this.accountService.createOne(payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Cập nhật một tài khoản' })
  @ApiResponse({ status: 200, description: 'Update Account successfully' })
  async updateInformationOfAccount(
    @Param('id') id: number,
    @Body() payload: UpdateAccountDto,
  ) {
    const result = await this.accountService.updateOne(id, payload);
    return func.response(result.statusCode, result.message, result.data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Token')
  @ApiOperation({ summary: 'Xoá một tài khoản' })
  @ApiResponse({ status: 200, description: 'Delete Account successfully' })
  async softDeleteOneAccount(@Param('id') id: number) {
    const result = await this.accountService.softDelete(id);
    return func.response(result.statusCode, result.message, result.data);
  }
}

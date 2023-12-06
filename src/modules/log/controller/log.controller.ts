import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogService } from '../service/log.service';

@Controller('log')
@ApiTags('Log')
export class LogController {
  constructor(private logService: LogService) {}

  @Get()
  async findLogs() {
    return await this.logService.findMany();
  }
}

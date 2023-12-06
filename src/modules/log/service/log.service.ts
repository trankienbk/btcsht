import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MONGO_DB_CONNECTION } from 'src/common/constants/db.constants';
import { HttpMessage } from 'src/common/message/http.message';
import { Repository } from 'typeorm';
import { LogEntity } from '../entities/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogEntity, MONGO_DB_CONNECTION)
    private logRepository: Repository<LogEntity>,
  ) {}

  async findMany() {
    const logs = await this.logRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: HttpMessage.READ_SUCCCESSFULLY,
      data: logs,
    };
  }
}

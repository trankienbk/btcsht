import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MONGO_DB_CONNECTION } from 'src/common/constants/db.constants';
import { LogController } from './controller/log.controller';
import { LogEntity } from './entities/log.entity';
import { LogService } from './service/log.service';
@Module({
  imports: [TypeOrmModule.forFeature([LogEntity], MONGO_DB_CONNECTION)],
  providers: [LogService],
  controllers: [LogController],
  exports: [LogService],
})
export class LogModule {}

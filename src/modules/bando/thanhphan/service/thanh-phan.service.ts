import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Repository } from 'typeorm';
import { ThanhPhanEntity } from '../entities/thanh-phan.entity';
import { Subject } from 'src/common/message/subject.message';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';

@Injectable()
export class ThanhPhanService {
  constructor(
    @InjectRepository(ThanhPhanEntity)
    private thanhPhanRepository: Repository<ThanhPhanEntity>,
  ) {}

  async findMany(code: string): Promise<MSCommunicate> {
    const thanhPhan = await this.thanhPhanRepository.find({
      where: { code: code },
    });

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.COMPOSITION,
      thanhPhan,
      Field.READ,
    );
  }
}

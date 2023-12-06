import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Repository } from 'typeorm';
import { ViTriEntity } from '../entities/vi-tri.entity';
import { Subject } from 'src/common/message/subject.message';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';

@Injectable()
export class ViTriService {
  constructor(
    @InjectRepository(ViTriEntity)
    private viTriRepository: Repository<ViTriEntity>,
  ) {}

  async findMany(isDisplay: number): Promise<MSCommunicate> {
    const duyTu = await this.viTriRepository.find({
      where: { isDisplay: isDisplay },
    });

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.VI_TRI,
      duyTu,
      Field.READ,
    );
  }
}

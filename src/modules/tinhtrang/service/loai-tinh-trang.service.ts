import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Repository } from 'typeorm';
import { LoaiTinhTrangEntity } from '../entities/loai-tinh-trang.entity';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';

@Injectable()
export class LoaiTinhTrangService {
  constructor(
    @InjectRepository(LoaiTinhTrangEntity)
    private loaiTinhTrangRepository: Repository<LoaiTinhTrangEntity>,
  ) {}

  async findManyLoaiTinhTrang(): Promise<MSCommunicate> {
    const result: LoaiTinhTrangEntity[] =
      await this.loaiTinhTrangRepository.find();
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.TINH_TRANG,
      result,
      Field.READ_MANY,
    );
  }
}

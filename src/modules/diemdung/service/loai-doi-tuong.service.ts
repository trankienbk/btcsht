import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Repository } from 'typeorm';
import { LoaiDoiTuongEntity } from '../entities/loai-doi-tuong.entity';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';

@Injectable()
export class DanhMucDoiTuongService {
  constructor(
    @InjectRepository(LoaiDoiTuongEntity)
    private loaiDiemDungRepository: Repository<LoaiDoiTuongEntity>,
  ) {}

  async findManyLoaiDoiTuong(): Promise<MSCommunicate> {
    const query = this.loaiDiemDungRepository.createQueryBuilder('type');

    const loaiDoiTuong: LoaiDoiTuongEntity[] = await query.getMany();

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_STOP_TYPE,
      loaiDoiTuong,
      Field.READ,
    );
  }
}

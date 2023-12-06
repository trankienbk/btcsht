import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Repository } from 'typeorm';
import { LoaiDiemDungEntity } from '../entities/loai-diem-dung.entity';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';
import { Content } from 'src/common/message/content.message';

@Injectable()
export class DanhMucDiemDungService {
  constructor(
    @InjectRepository(LoaiDiemDungEntity)
    private loaiDiemDungRepository: Repository<LoaiDiemDungEntity>,
  ) {}

  async findManyLoaiDiemDung(): Promise<MSCommunicate> {
    const query = this.loaiDiemDungRepository.createQueryBuilder('type');

    const loaiDiemDung: LoaiDiemDungEntity[] = await query.getMany();

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_STOP_TYPE,
      loaiDiemDung,
      Field.READ,
    );
  }
}

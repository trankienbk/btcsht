import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Repository } from 'typeorm';
import { LoaiDiemDungCauHinhEntity } from '../entities/loai-diem-dung-cau-hinh.entity';
import { ILoaiDiemDungParent } from '../interface/loai-diem-dung.interface';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import { Content } from 'src/common/message/content.message';

@Injectable()
export class DanhMucDiemDungCauHinhService {
  constructor(
    @InjectRepository(LoaiDiemDungCauHinhEntity)
    private loaiDiemDungCauHinhRepository: Repository<LoaiDiemDungCauHinhEntity>,
  ) {}

  async findManyLoaiDiemDungCauHinh(id: number): Promise<MSCommunicate> {
    const loaiDiemDung: LoaiDiemDungCauHinhEntity[] =
      await this.loaiDiemDungCauHinhRepository.find({
        relations: {
          diemDung: true,
          doiTuong: true,
        },
        where: {
          diemDung: {
            id: id,
          },
        },
      });

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_STOP_TYPE,
      loaiDiemDung,
      Field.READ,
    );
  }

  async updateManyLoaiDiemDungCauHinh(
    payload: ILoaiDiemDungParent,
  ): Promise<MSCommunicate> {
    const array = payload.data;
    await this.loaiDiemDungCauHinhRepository.save(array);

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_STOP_TYPE,
      payload,
      Field.UPDATE,
    );
  }
}

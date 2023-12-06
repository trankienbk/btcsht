import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Not, Repository } from 'typeorm';
import { NhaDieuHanhEntity } from '../entities/nha-dieu-hanh.entity';
import { IDanhMucNhaDieuHanh } from '../interface/nha-dieu-hanh.interface';
import { Subject } from 'src/common/message/subject.message';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { DiemDungEntity } from 'src/modules/diemdung/entities/diem-dung.entity';

@Injectable()
export class NhaDieuHanhService {
  constructor(
    @InjectRepository(NhaDieuHanhEntity)
    private NhaDieuHanhRepository: Repository<NhaDieuHanhEntity>,
    @InjectRepository(DiemDungEntity)
    private diemDungRepository: Repository<DiemDungEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const NhaDieuHanh = await this.NhaDieuHanhRepository.find({
      relations: {
        diemDungNhaDieuHanh: true,
      },
      where: {
        name: Like(`%${name ?? ''}%`),
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.NhaDieuHanhRepository.count();
    const data = {
      nhaDieuHanh: NhaDieuHanh,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.CONTROL_CENTER_HOUSE,
      data,
      Field.READ,
    );
  }

  async findOne(id: number): Promise<MSCommunicate> {
    const nhaDieuHanh = await this.NhaDieuHanhRepository.findOne({
      relations: {
        diemDungNhaDieuHanh: true,
      },
      where: { id: id },
    });
    if (!nhaDieuHanh) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.CONTROL_CENTER_HOUSE,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.CONTROL_CENTER_HOUSE,
      nhaDieuHanh,
      Field.READ,
    );
  }

  async create(payload: IDanhMucNhaDieuHanh): Promise<MSCommunicate> {
    const exist = await this.NhaDieuHanhRepository.findOne({
      where: { name: payload.name },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.CONTROL_CENTER_HOUSE,
        null,
        Field.NAME,
      );
    }
    const diemDung = await this.diemDungRepository.findOne({
      where: { id: payload.diemDungId },
    });

    if (!diemDung) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.CONTROL_CENTER_HOUSE,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    const nhaDieuHanh = await this.NhaDieuHanhRepository.save({
      name: payload.name,
      description: payload.description,
      mai: payload.mai,
      nen: payload.nen,
      mong: payload.mong,
      thietBi: payload.thietBi,
      diemDungNhaDieuHanh: {
        id: payload.diemDungId,
      },
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.CONTROL_CENTER_HOUSE,
      nhaDieuHanh,
      Field.CREATE,
    );
  }

  async update(
    id: number,
    payload: IDanhMucNhaDieuHanh,
  ): Promise<MSCommunicate> {
    const exist = await this.NhaDieuHanhRepository.findOne({
      where: { name: payload.name, id: Not(id) },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.CONTROL_CENTER_HOUSE,
        null,
        Field.NAME,
      );
    }
    const diemDung = await this.diemDungRepository.findOne({
      where: { id: payload.diemDungId },
    });

    if (!diemDung) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.CONTROL_CENTER_HOUSE,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    await this.NhaDieuHanhRepository.update(
      { id },
      {
        name: payload.name,
        description: payload.description,
        mai: payload.mai,
        nen: payload.nen,
        mong: payload.mong,
        thietBi: payload.thietBi,
        diemDungNhaDieuHanh: {
          id: payload.diemDungId,
        },
      },
    );

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.CONTROL_CENTER_HOUSE,
      payload,
      Field.UPDATE,
    );
  }

  async delete(id: number): Promise<MSCommunicate> {
    const exist = await this.NhaDieuHanhRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.CONTROL_CENTER_HOUSE,
        null,
        Field.DELETE,
      );
    }
    await this.NhaDieuHanhRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.CONTROL_CENTER_HOUSE,
      id,
      Field.DELETE,
    );
  }
}

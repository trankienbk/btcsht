import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Not, Repository } from 'typeorm';
import { DuongNoiBoEntity } from '../entities/duong-noi-bo.entity';
import { IDanhMucDuongNoiBo } from '../interface/duong-noi-bo.interface';
import { Subject } from 'src/common/message/subject.message';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { DiemDungEntity } from 'src/modules/diemdung/entities/diem-dung.entity';

@Injectable()
export class DuongNoiBoService {
  constructor(
    @InjectRepository(DuongNoiBoEntity)
    private DuongNoiBoRepository: Repository<DuongNoiBoEntity>,
    @InjectRepository(DiemDungEntity)
    private diemDungRepository: Repository<DiemDungEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const DuongNoiBo = await this.DuongNoiBoRepository.find({
      relations: {
        diemDungDuongNoiBo: true,
      },
      where: {
        name: Like(`%${name ?? ''}%`),
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.DuongNoiBoRepository.count();
    const data = {
      pathway: DuongNoiBo,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.PATHWAY,
      data,
      Field.READ,
    );
  }

  async findOne(id: number): Promise<MSCommunicate> {
    const pathway = await this.DuongNoiBoRepository.findOne({
      relations: {
        diemDungDuongNoiBo: true,
      },
      where: { id: id },
    });
    if (!pathway) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.PATHWAY,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.PATHWAY,
      pathway,
      Field.READ,
    );
  }

  async create(payload: IDanhMucDuongNoiBo): Promise<MSCommunicate> {
    const exist = await this.DuongNoiBoRepository.findOne({
      where: { name: payload.name },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.PATHWAY,
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
        Subject.PATHWAY,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    const pathway = await this.DuongNoiBoRepository.save({
      name: payload.name,
      description: payload.description,
      diemDungDuongNoiBo: {
        id: payload.diemDungId,
      },
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.PATHWAY,
      pathway,
      Field.CREATE,
    );
  }

  async update(
    id: number,
    payload: IDanhMucDuongNoiBo,
  ): Promise<MSCommunicate> {
    const exist = await this.DuongNoiBoRepository.findOne({
      where: { name: payload.name, id: Not(id) },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.PATHWAY,
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
        Subject.PATHWAY,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    await this.DuongNoiBoRepository.update(
      { id },
      {
        name: payload.name,
        description: payload.description,
        diemDungDuongNoiBo: {
          id: payload.diemDungId,
        },
      },
    );

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.PATHWAY,
      payload,
      Field.UPDATE,
    );
  }

  async delete(id: number): Promise<MSCommunicate> {
    const exist = await this.DuongNoiBoRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.PATHWAY,
        null,
        Field.DELETE,
      );
    }
    await this.DuongNoiBoRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.PATHWAY,
      id,
      Field.DELETE,
    );
  }
}

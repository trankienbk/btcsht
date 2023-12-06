import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Not, Repository } from 'typeorm';
import { HeNoiBoEntity } from '../entities/he-noi-bo.entity';
import { IDanhMucHeNoiBo } from '../interface/he-noi-bo.interface';
import { Subject } from 'src/common/message/subject.message';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { DiemDungEntity } from 'src/modules/diemdung/entities/diem-dung.entity';

@Injectable()
export class HeNoiBoService {
  constructor(
    @InjectRepository(HeNoiBoEntity)
    private heNoiBoRepository: Repository<HeNoiBoEntity>,
    @InjectRepository(DiemDungEntity)
    private diemDungRepository: Repository<DiemDungEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const HeNoiBo = await this.heNoiBoRepository.find({
      relations: {
        diemDungHeNoiBo: true,
      },
      where: {
        name: Like(`%${name ?? ''}%`),
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.heNoiBoRepository.count();
    const data = {
      innerSidewalk: HeNoiBo,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.INNER_SIDEWALK,
      data,
      Field.READ,
    );
  }

  async findOne(id: number): Promise<MSCommunicate> {
    const innerSidewalk = await this.heNoiBoRepository.findOne({
      relations: {
        diemDungHeNoiBo: true,
      },
      where: { id: id },
    });
    if (!innerSidewalk) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.INNER_SIDEWALK,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.INNER_SIDEWALK,
      innerSidewalk,
      Field.READ,
    );
  }

  async create(payload: IDanhMucHeNoiBo): Promise<MSCommunicate> {
    const exist = await this.heNoiBoRepository.findOne({
      where: { name: payload.name },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.INNER_SIDEWALK,
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
        Subject.INNER_SIDEWALK,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    const innerSidewalk = await this.heNoiBoRepository.save({
      name: payload.name,
      description: payload.description,
      diemDungHeNoiBo: {
        id: payload.diemDungId,
      },
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.INNER_SIDEWALK,
      innerSidewalk,
      Field.CREATE,
    );
  }

  async update(id: number, payload: IDanhMucHeNoiBo): Promise<MSCommunicate> {
    const exist = await this.heNoiBoRepository.findOne({
      where: { name: payload.name, id: Not(id) },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.INNER_SIDEWALK,
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
        Subject.INNER_SIDEWALK,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    await this.heNoiBoRepository.update(
      { id },
      {
        name: payload.name,
        description: payload.description,
        diemDungHeNoiBo: {
          id: payload.diemDungId,
        },
      },
    );

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.INNER_SIDEWALK,
      payload,
      Field.UPDATE,
    );
  }

  async delete(id: number): Promise<MSCommunicate> {
    const exist = await this.heNoiBoRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.INNER_SIDEWALK,
        null,
        Field.DELETE,
      );
    }
    await this.heNoiBoRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.INNER_SIDEWALK,
      id,
      Field.DELETE,
    );
  }
}

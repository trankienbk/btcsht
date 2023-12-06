import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Repository, Not } from 'typeorm';
import { BienChiDanEntity } from '../entities/bien-chi-dan.entity';
import { IDanhMucBienChiDan } from '../interface/bien-chi-dan.interface';
import { Subject } from 'src/common/message/subject.message';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { DiemDungEntity } from 'src/modules/diemdung/entities/diem-dung.entity';

@Injectable()
export class BienChiDanService {
  constructor(
    @InjectRepository(BienChiDanEntity)
    private bienChiDanRepository: Repository<BienChiDanEntity>,
    @InjectRepository(DiemDungEntity)
    private diemDungRepository: Repository<DiemDungEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const BienChiDan = await this.bienChiDanRepository.find({
      relations: {
        diemDungBienChiDan: true,
      },
      where: {
        name: Like(`%${name ?? ''}%`),
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.bienChiDanRepository.count();
    const data = {
      signpost: BienChiDan,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.SIGNPOST,
      data,
      Field.READ,
    );
  }

  async findOne(id: number): Promise<MSCommunicate> {
    const signpost = await this.bienChiDanRepository.findOne({
      relations: {
        diemDungBienChiDan: true,
      },
      where: { id: id },
    });
    if (!signpost) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.SIGNPOST,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.SIGNPOST,
      signpost,
      Field.READ,
    );
  }

  async create(payload: IDanhMucBienChiDan): Promise<MSCommunicate> {
    const exist = await this.bienChiDanRepository.findOne({
      where: { name: payload.name },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.SIGNPOST,
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
        Subject.SIGNPOST,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    const signpost = await this.bienChiDanRepository.save({
      name: payload.name,
      description: payload.description,
      diemDungBienChiDan: {
        id: payload.diemDungId,
      },
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.SIGNPOST,
      signpost,
      Field.CREATE,
    );
  }

  async update(
    id: number,
    payload: IDanhMucBienChiDan,
  ): Promise<MSCommunicate> {
    const exist = await this.bienChiDanRepository.findOne({
      where: { name: payload.name, id: Not(id) },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.SIGNPOST,
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
        Subject.SIGNPOST,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    await this.bienChiDanRepository.update(
      { id },
      {
        name: payload.name,
        description: payload.description,
        diemDungBienChiDan: {
          id: payload.diemDungId,
        },
      },
    );

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.SIGNPOST,
      payload,
      Field.UPDATE,
    );
  }

  async delete(id: number): Promise<MSCommunicate> {
    const exist = await this.bienChiDanRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.SIGNPOST,
        null,
        Field.DELETE,
      );
    }
    await this.bienChiDanRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.SIGNPOST,
      id,
      Field.DELETE,
    );
  }
}

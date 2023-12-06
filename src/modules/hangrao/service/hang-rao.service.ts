import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Not, Repository } from 'typeorm';
import { HangRaoEntity } from '../entities/hang-rao.entity';
import { IDanhMucHangRao } from '../interface/hang-rao.interface';
import { Subject } from 'src/common/message/subject.message';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { DiemDungEntity } from 'src/modules/diemdung/entities/diem-dung.entity';

@Injectable()
export class HangRaoService {
  constructor(
    @InjectRepository(HangRaoEntity)
    private hangRaoRepository: Repository<HangRaoEntity>,
    @InjectRepository(DiemDungEntity)
    private diemDungRepository: Repository<DiemDungEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const HangRao = await this.hangRaoRepository.find({
      relations: {
        diemDungHangRao: true,
      },
      where: {
        name: Like(`%${name ?? ''}%`),
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.hangRaoRepository.count();
    const data = {
      hangRao: HangRao,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.FENCE,
      data,
      Field.READ,
    );
  }

  async findOne(id: number): Promise<MSCommunicate> {
    const hangRao = await this.hangRaoRepository.findOne({
      relations: {
        diemDungHangRao: true,
      },
      where: { id: id },
    });
    if (!hangRao) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.FENCE,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.FENCE,
      hangRao,
      Field.READ,
    );
  }

  async create(payload: IDanhMucHangRao): Promise<MSCommunicate> {
    const exist = await this.hangRaoRepository.findOne({
      where: { name: payload.name },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.FENCE,
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
        Subject.FENCE,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    const hangRao = await this.hangRaoRepository.save({
      name: payload.name,
      description: payload.description,
      diemDungHangRao: {
        id: payload.diemDungId,
      },
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.FENCE,
      hangRao,
      Field.CREATE,
    );
  }

  async update(id: number, payload: IDanhMucHangRao): Promise<MSCommunicate> {
    const exist = await this.hangRaoRepository.findOne({
      where: { name: payload.name, id: Not(id) },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.FENCE,
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
        Subject.FENCE,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    await this.hangRaoRepository.update(
      { id },
      {
        name: payload.name,
        description: payload.description,
        diemDungHangRao: {
          id: payload.diemDungId,
        },
      },
    );

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.FENCE,
      payload,
      Field.UPDATE,
    );
  }

  async delete(id: number): Promise<MSCommunicate> {
    const exist = await this.hangRaoRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.FENCE,
        null,
        Field.DELETE,
      );
    }
    await this.hangRaoRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.FENCE,
      id,
      Field.DELETE,
    );
  }
}

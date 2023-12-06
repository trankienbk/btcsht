import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Not, Repository } from 'typeorm';
import { NhaVeSinhEntity } from '../entities/nha-ve-sinh.entity';
import { IDanhMucNhaVeSinh } from '../interface/nha-ve-sinh.interface';
import { Subject } from 'src/common/message/subject.message';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { DiemDungEntity } from 'src/modules/diemdung/entities/diem-dung.entity';

@Injectable()
export class NhaVeSinhService {
  constructor(
    @InjectRepository(NhaVeSinhEntity)
    private NhaVeSinhRepository: Repository<NhaVeSinhEntity>,
    @InjectRepository(DiemDungEntity)
    private diemDungRepository: Repository<DiemDungEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const NhaVeSinh = await this.NhaVeSinhRepository.find({
      relations: {
        diemDungNhaVeSinh: true,
      },
      where: {
        name: Like(`%${name ?? ''}%`),
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.NhaVeSinhRepository.count();
    const data = {
      toilets: NhaVeSinh,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.TOILET,
      data,
      Field.READ,
    );
  }

  async findOne(id: number): Promise<MSCommunicate> {
    const toilets = await this.NhaVeSinhRepository.findOne({
      relations: {
        diemDungNhaVeSinh: true,
      },
      where: { id: id },
    });
    if (!toilets) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.TOILET,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.TOILET,
      toilets,
      Field.READ,
    );
  }

  async create(payload: IDanhMucNhaVeSinh): Promise<MSCommunicate> {
    const exist = await this.NhaVeSinhRepository.findOne({
      where: { name: payload.name },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.TOILET,
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
        Subject.TOILET,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    const toilets = await this.NhaVeSinhRepository.save({
      name: payload.name,
      description: payload.description,
      diemDungNhaVeSinh: {
        id: payload.diemDungId,
      },
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.TOILET,
      toilets,
      Field.CREATE,
    );
  }

  async update(id: number, payload: IDanhMucNhaVeSinh): Promise<MSCommunicate> {
    const exist = await this.NhaVeSinhRepository.findOne({
      where: { name: payload.name, id: Not(id) },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.TOILET,
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
        Subject.TOILET,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    await this.NhaVeSinhRepository.update(
      { id },
      {
        name: payload.name,
        description: payload.description,
        diemDungNhaVeSinh: {
          id: payload.diemDungId,
        },
      },
    );

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.TOILET,
      payload,
      Field.UPDATE,
    );
  }

  async delete(id: number): Promise<MSCommunicate> {
    const exist = await this.NhaVeSinhRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.TOILET,
        null,
        Field.DELETE,
      );
    }
    await this.NhaVeSinhRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.TOILET,
      id,
      Field.DELETE,
    );
  }
}

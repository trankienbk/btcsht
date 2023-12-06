import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Not, Repository } from 'typeorm';
import { DanhMucNhaChoEntity } from '../entities/danh-muc-nha-cho.entity';
import { IDanhMucNhaCho } from '../interface/danh-muc-nha-cho.interface';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';

@Injectable()
export class DanhMucNhaChoService {
  constructor(
    @InjectRepository(DanhMucNhaChoEntity)
    private loaiNhaChoRepository: Repository<DanhMucNhaChoEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const busShelter = await this.loaiNhaChoRepository.find({
      where: { name: Like(`%${name ?? ''}%`) },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.loaiNhaChoRepository.count();
    const data = {
      busShelterType: busShelter,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_SHELTERS_TYPE,
      data,
      Field.READ,
    );
  }

  async findOneById(id: number): Promise<MSCommunicate> {
    const duyTu = await this.loaiNhaChoRepository.findOne({
      where: { id: id },
    });
    if (!duyTu) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.BUS_SHELTERS_TYPE,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_SHELTERS_TYPE,
      duyTu,
      Field.READ,
    );
  }

  async createOne(payload: IDanhMucNhaCho): Promise<MSCommunicate> {
    const exist = await this.loaiNhaChoRepository.findOne({
      where: { name: payload.name },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.BUS_SHELTERS_TYPE,
        null,
        Field.NAME,
      );
    }

    const duyTu = await this.loaiNhaChoRepository.save(payload);

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.BUS_SHELTERS_TYPE,
      duyTu,
      Field.CREATE,
    );
  }

  async updateOne(id: number, payload: IDanhMucNhaCho): Promise<MSCommunicate> {
    const exist = await this.loaiNhaChoRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.BUS_SHELTERS_TYPE,
        null,
        Field.UPDATE,
      );
    }

    const existName = await this.loaiNhaChoRepository.findOne({
      where: { name: payload.name, id: Not(exist.id) },
    });
    if (existName) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.BUS_SHELTERS_TYPE,
        null,
        Field.NAME,
      );
    }

    const duyTu = await this.loaiNhaChoRepository.save({
      id: exist.id,
      ...payload,
    });
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_SHELTERS_TYPE,
      duyTu,
      Field.UPDATE,
    );
  }

  async softDeleteOne(id: number): Promise<MSCommunicate> {
    const exist = await this.loaiNhaChoRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.BUS_SHELTERS_TYPE,
        null,
        Field.DELETE,
      );
    }
    await this.loaiNhaChoRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_SHELTERS_TYPE,
      id,
      Field.DELETE,
    );
  }
}

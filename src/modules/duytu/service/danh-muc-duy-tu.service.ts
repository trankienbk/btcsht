import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { And, Like, Not, Repository } from 'typeorm';
import { DanhMucDuyTuEntity } from '../entities/danh-muc-duy-tu.entity';
import { IDanhMucDuyTu } from '../interface/danh-muc-duy-tu.interface';
import { Subject } from 'src/common/message/subject.message';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';

@Injectable()
export class DanhMucDuyTuService {
  constructor(
    @InjectRepository(DanhMucDuyTuEntity)
    private danhMucDuyTuRepository: Repository<DanhMucDuyTuEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const duyTu = await this.danhMucDuyTuRepository.find({
      where: {
        name: And(Like(`%${name ?? ''}%`), Not('Chưa thực hiện duy tu')),
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.danhMucDuyTuRepository.count();
    const data = {
      duyTus: duyTu,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.MAINTENNANCE_TYPE,
      data,
      Field.READ,
    );
  }

  async findOneById(id: number): Promise<MSCommunicate> {
    const duyTu = await this.danhMucDuyTuRepository.findOne({
      where: { id: id },
    });
    if (!duyTu) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.MAINTENNANCE_TYPE,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.MAINTENNANCE_TYPE,
      duyTu,
      Field.READ,
    );
  }

  async createOne(payload: IDanhMucDuyTu): Promise<MSCommunicate> {
    const exist = await this.danhMucDuyTuRepository.findOne({
      where: { name: payload.name },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.MAINTENNANCE_TYPE,
        null,
        Field.NAME,
      );
    }

    const duyTu = await this.danhMucDuyTuRepository.save(payload);

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.MAINTENNANCE_TYPE,
      duyTu,
      Field.CREATE,
    );
  }

  async updateOne(id: number, payload: IDanhMucDuyTu): Promise<MSCommunicate> {
    const exist = await this.danhMucDuyTuRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.MAINTENNANCE_TYPE,
        null,
        Field.UPDATE,
      );
    }

    const existName = await this.danhMucDuyTuRepository.findOne({
      where: { name: payload.name, id: Not(exist.id) },
    });
    if (existName) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.MAINTENNANCE_TYPE,
        null,
        Field.NAME,
      );
    }

    const duyTu = await this.danhMucDuyTuRepository.save({
      id: exist.id,
      ...payload,
    });
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.MAINTENNANCE_TYPE,
      duyTu,
      Field.UPDATE,
    );
  }

  async softDeleteOne(id: number): Promise<MSCommunicate> {
    const exist = await this.danhMucDuyTuRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.MAINTENNANCE_TYPE,
        null,
        Field.DELETE,
      );
    }
    await this.danhMucDuyTuRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.MAINTENNANCE_TYPE,
      id,
      Field.DELETE,
    );
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Not, Repository } from 'typeorm';
import { DanhMucPanoEntity } from '../entities/danh-muc-pano.entity';
import { IDanhMucPano } from '../interface/danh-muc-pano.interface';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';

@Injectable()
export class DanhMucPanoService {
  constructor(
    @InjectRepository(DanhMucPanoEntity)
    private loaiPanoRepository: Repository<DanhMucPanoEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const loaiPano = await this.loaiPanoRepository.find({
      where: { name: Like(`%${name ?? ''}%`) },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.loaiPanoRepository.count();
    const data = {
      panoType: loaiPano,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.PANO_TYPE,
      data,
      Field.READ,
    );
  }

  async findOne(id: number): Promise<MSCommunicate> {
    const paintLine = await this.loaiPanoRepository.findOne({
      where: { id: id },
    });
    if (!paintLine) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.PANO_TYPE,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.PANO_TYPE,
      paintLine,
      Field.READ,
    );
  }

  async create(payload: IDanhMucPano): Promise<MSCommunicate> {
    const exist = await this.loaiPanoRepository.findOne({
      where: { name: payload.name },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.PANO_TYPE,
        null,
        Field.NAME,
      );
    }

    const paintLine = await this.loaiPanoRepository.save(payload);

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.PANO_TYPE,
      paintLine,
      Field.CREATE,
    );
  }

  async update(id: number, payload: IDanhMucPano): Promise<MSCommunicate> {
    const exist = await this.loaiPanoRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.PANO_TYPE,
        null,
        Field.UPDATE,
      );
    }

    const existName = await this.loaiPanoRepository.findOne({
      where: { name: payload.name, id: Not(exist.id) },
    });
    if (existName) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.PANO_TYPE,
        null,
        Field.NAME,
      );
    }

    const paintLine = await this.loaiPanoRepository.save({
      id: exist.id,
      ...payload,
    });
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.PANO_TYPE,
      paintLine,
      Field.UPDATE,
    );
  }

  async delete(id: number): Promise<MSCommunicate> {
    const exist = await this.loaiPanoRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.PANO_TYPE,
        null,
        Field.DELETE,
      );
    }
    await this.loaiPanoRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.PANO_TYPE,
      id,
      Field.DELETE,
    );
  }
}

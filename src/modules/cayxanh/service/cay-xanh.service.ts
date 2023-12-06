import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Repository, Not } from 'typeorm';
import { CayXanhEntity } from '../entities/cay-xanh.entity';
import { IDanhMucCayXanh } from '../interface/cay-xanh.interface';
import { Subject } from 'src/common/message/subject.message';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { DiemDungEntity } from 'src/modules/diemdung/entities/diem-dung.entity';

@Injectable()
export class CayXanhService {
  constructor(
    @InjectRepository(CayXanhEntity)
    private cayXanhRepository: Repository<CayXanhEntity>,
    @InjectRepository(DiemDungEntity)
    private diemDungRepository: Repository<DiemDungEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const cayXanh = await this.cayXanhRepository.find({
      relations: {
        diemDungCayXanh: true,
      },
      where: {
        name: Like(`%${name ?? ''}%`),
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.cayXanhRepository.count();
    const data = {
      trees: cayXanh,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.CAY_XANH,
      data,
      Field.READ,
    );
  }

  async findOne(id: number): Promise<MSCommunicate> {
    const tree = await this.cayXanhRepository.findOne({
      relations: {
        diemDungCayXanh: true,
      },
      where: { id: id },
    });
    if (!tree) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.CAY_XANH,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.CAY_XANH,
      tree,
      Field.READ,
    );
  }

  async create(payload: IDanhMucCayXanh): Promise<MSCommunicate> {
    const exist = await this.cayXanhRepository.findOne({
      where: { name: payload.name },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.CAY_XANH,
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
        Subject.CAY_XANH,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    const tree = await this.cayXanhRepository.save({
      name: payload.name,
      description: payload.description,
      diemDungCayXanh: {
        id: payload.diemDungId,
      },
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.CAY_XANH,
      tree,
      Field.CREATE,
    );
  }

  async update(id: number, payload: IDanhMucCayXanh): Promise<MSCommunicate> {
    const exist = await this.cayXanhRepository.findOne({
      where: { name: payload.name, id: Not(id) },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.CAY_XANH,
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
        Subject.CAY_XANH,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    await this.cayXanhRepository.update(
      { id },
      {
        name: payload.name,
        description: payload.description,
        diemDungCayXanh: {
          id: payload.diemDungId,
        },
      },
    );

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.CAY_XANH,
      payload,
      Field.UPDATE,
    );
  }

  async delete(id: number): Promise<MSCommunicate> {
    const exist = await this.cayXanhRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.CAY_XANH,
        null,
        Field.DELETE,
      );
    }
    await this.cayXanhRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.CAY_XANH,
      id,
      Field.DELETE,
    );
  }
}

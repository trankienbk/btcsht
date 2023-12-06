import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Not, Repository } from 'typeorm';
import { DanhMucVachSonEntity } from '../entities/danh-muc-vach-son.entity';
import { IDanhMucVachSon } from '../interface/danh-muc-vach-son.interface';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';

@Injectable()
export class DanhMucVachSonService {
  constructor(
    @InjectRepository(DanhMucVachSonEntity)
    private loaiVachSonRepository: Repository<DanhMucVachSonEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const loaiVachSon = await this.loaiVachSonRepository.find({
      where: { name: Like(`%${name ?? ''}%`) },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.loaiVachSonRepository.count();
    const data = {
      roadMakingsType: loaiVachSon,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.LOAI_VACH_SON,
      data,
      Field.READ,
    );
  }

  async findOneById(id: number): Promise<MSCommunicate> {
    const paintLine = await this.loaiVachSonRepository.findOne({
      where: { id: id },
    });
    if (!paintLine) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.LOAI_VACH_SON,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.LOAI_VACH_SON,
      paintLine,
      Field.READ,
    );
  }

  async createOne(payload: IDanhMucVachSon): Promise<MSCommunicate> {
    const exist = await this.loaiVachSonRepository.findOne({
      where: { name: payload.name },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.LOAI_VACH_SON,
        null,
        Field.NAME,
      );
    }

    const paintLine = await this.loaiVachSonRepository.save(payload);

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.LOAI_VACH_SON,
      paintLine,
      Field.CREATE,
    );
  }

  async updateOne(
    id: number,
    payload: IDanhMucVachSon,
  ): Promise<MSCommunicate> {
    const exist = await this.loaiVachSonRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.LOAI_VACH_SON,
        null,
        Field.UPDATE,
      );
    }

    const existName = await this.loaiVachSonRepository.findOne({
      where: { name: payload.name, id: Not(exist.id) },
    });
    if (existName) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.LOAI_VACH_SON,
        null,
        Field.NAME,
      );
    }

    const paintLine = await this.loaiVachSonRepository.save({
      id: exist.id,
      ...payload,
    });
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.LOAI_VACH_SON,
      paintLine,
      Field.UPDATE,
    );
  }

  async softDeleteOne(id: number): Promise<MSCommunicate> {
    const exist = await this.loaiVachSonRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.LOAI_VACH_SON,
        null,
        Field.DELETE,
      );
    }
    await this.loaiVachSonRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.LOAI_VACH_SON,
      id,
      Field.DELETE,
    );
  }
}

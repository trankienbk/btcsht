import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Not, Repository } from 'typeorm';
import { HeThongChieuSangEntity } from '../entities/he-thong-chieu-sang.entity';
import { IDanhMucHeThongChieuSang } from '../interface/he-thong-chieu-sang.interface';
import { Subject } from 'src/common/message/subject.message';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { DiemDungEntity } from 'src/modules/diemdung/entities/diem-dung.entity';

@Injectable()
export class HeThongChieuSangService {
  constructor(
    @InjectRepository(HeThongChieuSangEntity)
    private heThongChieuSangRepository: Repository<HeThongChieuSangEntity>,
    @InjectRepository(DiemDungEntity)
    private diemDungRepository: Repository<DiemDungEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const HeThongChieuSang = await this.heThongChieuSangRepository.find({
      relations: {
        diemDungHeThongChieuSang: true,
      },
      where: {
        name: Like(`%${name ?? ''}%`),
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.heThongChieuSangRepository.count();
    const data = {
      lightingSystem: HeThongChieuSang,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.LIGHTING_SYSTEM,
      data,
      Field.READ,
    );
  }

  async findOne(id: number): Promise<MSCommunicate> {
    const lightingSystem = await this.heThongChieuSangRepository.findOne({
      relations: {
        diemDungHeThongChieuSang: true,
      },
      where: { id: id },
    });
    if (!lightingSystem) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.LIGHTING_SYSTEM,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.LIGHTING_SYSTEM,
      lightingSystem,
      Field.READ,
    );
  }

  async create(payload: IDanhMucHeThongChieuSang): Promise<MSCommunicate> {
    const exist = await this.heThongChieuSangRepository.findOne({
      where: { name: payload.name },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.LIGHTING_SYSTEM,
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
        Subject.LIGHTING_SYSTEM,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    const lightingSystem = await this.heThongChieuSangRepository.save({
      name: payload.name,
      description: payload.description,
      diemDungHeThongChieuSang: {
        id: payload.diemDungId,
      },
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.LIGHTING_SYSTEM,
      lightingSystem,
      Field.CREATE,
    );
  }

  async update(
    id: number,
    payload: IDanhMucHeThongChieuSang,
  ): Promise<MSCommunicate> {
    const exist = await this.heThongChieuSangRepository.findOne({
      where: { name: payload.name, id: Not(id) },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.LIGHTING_SYSTEM,
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
        Subject.LIGHTING_SYSTEM,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    await this.heThongChieuSangRepository.update(
      { id },
      {
        name: payload.name,
        description: payload.description,
        diemDungHeThongChieuSang: {
          id: payload.diemDungId,
        },
      },
    );

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.LIGHTING_SYSTEM,
      payload,
      Field.UPDATE,
    );
  }

  async delete(id: number): Promise<MSCommunicate> {
    const exist = await this.heThongChieuSangRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.LIGHTING_SYSTEM,
        null,
        Field.DELETE,
      );
    }
    await this.heThongChieuSangRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.LIGHTING_SYSTEM,
      id,
      Field.DELETE,
    );
  }
}

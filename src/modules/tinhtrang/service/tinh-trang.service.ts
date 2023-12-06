import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Not, Repository } from 'typeorm';
import { TinhTrangEntity } from '../entities/tinh-trang.entity';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';

@Injectable()
export class TinhTrangService {
  constructor(
    @InjectRepository(TinhTrangEntity)
    private tinhTrangRepository: Repository<TinhTrangEntity>,
  ) {}

  async findMany(
    offset: number,
    limit: number,
    loaiTinhTrangId: number,
  ): Promise<MSCommunicate> {
    const tinhTrang = await this.tinhTrangRepository.find({
      where: { name: Like(`%${loaiTinhTrangId ?? ''}%`) },
      relations: {
        loaiTinhTrang: true,
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.tinhTrangRepository.count();
    const data = {
      tinhTrang: tinhTrang,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.TINH_TRANG,
      data,
      Field.READ,
    );
  }

  async findOneById(id: number): Promise<MSCommunicate> {
    const tinhTrang = await this.tinhTrangRepository.findOne({
      relations: {
        loaiTinhTrang: true,
      },
      where: { id: id },
    });
    if (!tinhTrang) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.TINH_TRANG,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.TINH_TRANG,
      tinhTrang,
      Field.READ,
    );
  }

  async createOne(payload: any): Promise<MSCommunicate> {
    const exist = await this.tinhTrangRepository.findOne({
      relations: {
        loaiTinhTrang: true,
      },
      where: {
        name: payload.name,
        loaiTinhTrang: {
          id: payload.loaiTinhTrangId,
        },
      },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.TINH_TRANG,
        null,
        Field.NAME,
      );
    }

    const tinhTrang: TinhTrangEntity = await this.tinhTrangRepository.save({
      name: payload.name,
      loaiTinhTrang: payload.loaiTinhTrangId,
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.TINH_TRANG,
      tinhTrang,
      Field.CREATE,
    );
  }

  async updateOne(id: number, payload: any): Promise<MSCommunicate> {
    const exist = await this.tinhTrangRepository.findOne({
      relations: {
        loaiTinhTrang: true,
      },
      where: {
        id: id,
        loaiTinhTrang: {
          id: payload.loaiTinhTrangId,
        },
      },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.TINH_TRANG,
        null,
        Field.UPDATE,
      );
    }

    const existName = await this.tinhTrangRepository.findOne({
      where: {
        name: payload.name,
        id: Not(exist.id),
        loaiTinhTrang: {
          id: payload.loaiTinhTrangId,
        },
      },
      relations: {
        loaiTinhTrang: true,
      },
    });
    if (existName) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.TINH_TRANG,
        null,
        Field.NAME,
      );
    }

    const tinhTrang = await this.tinhTrangRepository.save({
      id: exist.id,
      ...payload,
    });
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.TINH_TRANG,
      tinhTrang,
      Field.UPDATE,
    );
  }

  async deleteOne(id: number): Promise<MSCommunicate> {
    const exist = await this.tinhTrangRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.TINH_TRANG,
        null,
        Field.DELETE,
      );
    }
    await this.tinhTrangRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.TINH_TRANG,
      id,
      Field.DELETE,
    );
  }
}

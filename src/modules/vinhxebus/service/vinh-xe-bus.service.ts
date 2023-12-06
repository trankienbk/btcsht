import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Not, Repository } from 'typeorm';
import { VinhXeBusEntity } from '../entities/vinh-xe-bus.entity';
import { IDanhMucVinhXeBus } from '../interface/vinh-xe-bus.interface';
import { Subject } from 'src/common/message/subject.message';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { DiemDungEntity } from 'src/modules/diemdung/entities/diem-dung.entity';

@Injectable()
export class VinhXeBusService {
  constructor(
    @InjectRepository(VinhXeBusEntity)
    private VinhXeBusRepository: Repository<VinhXeBusEntity>,
    @InjectRepository(DiemDungEntity)
    private diemDungRepository: Repository<DiemDungEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const VinhXeBus = await this.VinhXeBusRepository.find({
      relations: {
        diemDungVinhXeBus: true,
      },
      where: {
        name: Like(`%${name ?? ''}%`),
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.VinhXeBusRepository.count();
    const data = {
      busStopBay: VinhXeBus,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_STOP_BAY,
      data,
      Field.READ,
    );
  }

  async findOne(id: number): Promise<MSCommunicate> {
    const busStopBay = await this.VinhXeBusRepository.findOne({
      relations: {
        diemDungVinhXeBus: true,
      },
      where: { id: id },
    });
    if (!busStopBay) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.BUS_STOP_BAY,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_STOP_BAY,
      busStopBay,
      Field.READ,
    );
  }

  async create(payload: IDanhMucVinhXeBus): Promise<MSCommunicate> {
    const exist = await this.VinhXeBusRepository.findOne({
      where: { name: payload.name },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.BUS_STOP_BAY,
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
        Subject.BUS_STOP_BAY,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    const busStopBay = await this.VinhXeBusRepository.save({
      name: payload.name,
      description: payload.description,
      diemDungVinhXeBus: {
        id: payload.diemDungId,
      },
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.BUS_STOP_BAY,
      busStopBay,
      Field.CREATE,
    );
  }

  async update(id: number, payload: IDanhMucVinhXeBus): Promise<MSCommunicate> {
    const exist = await this.VinhXeBusRepository.findOne({
      where: { name: payload.name, id: Not(id) },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.BUS_STOP_BAY,
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
        Subject.BUS_STOP_BAY,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    await this.VinhXeBusRepository.update(
      { id },
      {
        name: payload.name,
        description: payload.description,
        diemDungVinhXeBus: {
          id: payload.diemDungId,
        },
      },
    );

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_STOP_BAY,
      payload,
      Field.UPDATE,
    );
  }

  async delete(id: number): Promise<MSCommunicate> {
    const exist = await this.VinhXeBusRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.BUS_STOP_BAY,
        null,
        Field.DELETE,
      );
    }
    await this.VinhXeBusRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_STOP_BAY,
      id,
      Field.DELETE,
    );
  }
}

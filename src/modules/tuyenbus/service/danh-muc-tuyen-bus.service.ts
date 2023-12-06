import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Not, Repository } from 'typeorm';
import { DanhMucTuyenBusEntity } from '../entities/danh-muc-tuyen-bus.entity';
import { IDanhMucTuyenBus } from '../interface/danh-muc-tuyen-bus.interface';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';
import CommonHelper from 'src/utils/common.util';

@Injectable()
export class DanhMucTuyenBusService {
  constructor(
    @InjectRepository(DanhMucTuyenBusEntity)
    private loaiTuyenBusRepository: Repository<DanhMucTuyenBusEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    soHieuTuyenBus: string | null,
    diemDauCuoi: string | null,
  ): Promise<MSCommunicate> {
    // if(diemDauCuoi){}
    const loaiTuyenBus = await this.loaiTuyenBusRepository.find({
      where: {
        soHieuTuyenBus: Like(`%${soHieuTuyenBus ?? ''}%`),
        // diemDauCuoi: Like(`%${diemDauCuoi ?? ''}%`),
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.loaiTuyenBusRepository.count();
    const data = {
      paint_line: loaiTuyenBus,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_ROUTES,
      data,
      Field.READ,
    );
  }

  async findOneById(id: number): Promise<MSCommunicate> {
    const duyTu = await this.loaiTuyenBusRepository.findOne({
      where: { id: id },
    });
    if (!duyTu) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.BUS_ROUTES,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_ROUTES,
      duyTu,
      Field.READ,
    );
  }

  async createOne(payload: IDanhMucTuyenBus): Promise<MSCommunicate> {
    if (CommonHelper.dublicateArray(payload.loTrinhDi)) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.DUBLICATE,
        Subject.BUS_ROUTES,
        null,
        Field.LO_TRINH_DI,
      );
    }

    if (CommonHelper.dublicateArray(payload.loTrinhVe)) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.DUBLICATE,
        Subject.BUS_ROUTES,
        null,
        Field.LO_TRINH_VE,
      );
    }

    for (let i = 0; i < payload.loTrinhDi.length; i++) {
      if ([payload.diemDau, payload.diemCuoi].includes(payload.loTrinhDi[i])) {
        return new MSCommunicate(
          HttpStatus.ACCEPTED,
          Content.DUBLICATE,
          Subject.BUS_ROUTES,
          null,
          Field.LO_TRINH_DI,
        );
      }
    }

    for (let i = 0; i < payload.loTrinhVe.length; i++) {
      if ([payload.diemDau, payload.diemCuoi].includes(payload.loTrinhVe[i])) {
        return new MSCommunicate(
          HttpStatus.ACCEPTED,
          Content.DUBLICATE,
          Subject.BUS_ROUTES,
          null,
          Field.LO_TRINH_VE,
        );
      }
    }

    const exist = await this.loaiTuyenBusRepository.findOne({
      where: { soHieuTuyenBus: payload.soHieuTuyenBus },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.BUS_ROUTES,
        null,
        Field.SO_HIEU_TUYEN_BUS,
      );
    }

    const tuyenBus = await this.loaiTuyenBusRepository.save(payload);

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.BUS_ROUTES,
      tuyenBus,
      Field.CREATE,
    );
  }

  async updateOne(
    id: number,
    payload: IDanhMucTuyenBus,
  ): Promise<MSCommunicate> {
    const exist = await this.loaiTuyenBusRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.BUS_ROUTES,
        null,
        Field.UPDATE,
      );
    }

    const existName = await this.loaiTuyenBusRepository.findOne({
      where: { soHieuTuyenBus: payload.soHieuTuyenBus, id: Not(exist.id) },
    });
    if (existName) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.BUS_ROUTES,
        null,
        Field.SO_HIEU_TUYEN_BUS,
      );
    }

    // const data = await this.loaiTuyenBusRepository.save({
    //   id: exist.id,
    //   soHieuTuyenBus: payload.soHieuTuyenBus || exist.soHieuTuyenBus,
    //   description: payload.description || exist.description,
    //   diemDau: payload.diemDau || exist.diemDau,
    //   diemCuoi: payload.diemCuoi || exist.diemCuoi,
    //   loTrinhDi: payload.loTrinhDi || exist.loTrinhDi,
    //   loTrinhVe: payload.loTrinhVe || exist.loTrinhVe,
    // });

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_ROUTES,
      [],
      Field.UPDATE,
    );
  }

  async softDeleteOne(id: number): Promise<MSCommunicate> {
    const exist = await this.loaiTuyenBusRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.BUS_ROUTES,
        null,
        Field.DELETE,
      );
    }
    await this.loaiTuyenBusRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.BUS_ROUTES,
      id,
      Field.DELETE,
    );
  }
}

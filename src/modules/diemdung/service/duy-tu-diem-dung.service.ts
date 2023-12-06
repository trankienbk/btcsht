import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Repository } from 'typeorm';
import { DuyTuDiemDungEntity } from '../entities/duy-tu-diem-dung.entity';
import { IDuyTuDiemDung } from '../interface/duy-tu-diem-dung.interface';
import { DiemDungEntity } from '../entities/diem-dung.entity';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';
import { TinhTrangEntity } from '../../../modules/tinhtrang/entities/tinh-trang.entity';
import { DanhMucDuyTuEntity } from 'src/modules/duytu/entities/danh-muc-duy-tu.entity';
import CommonHelper from 'src/utils/common.util';

@Injectable()
export class DuyTuDiemDungService {
  constructor(
    @InjectRepository(DuyTuDiemDungEntity)
    private duyTuDiemDungRepository: Repository<DuyTuDiemDungEntity>,
    @InjectRepository(TinhTrangEntity)
    private tinhTrangRepository: Repository<TinhTrangEntity>,
    @InjectRepository(DiemDungEntity)
    private diemDungRepository: Repository<DiemDungEntity>,
    @InjectRepository(DanhMucDuyTuEntity)
    private duyTuRepository: Repository<DanhMucDuyTuEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    diemDungId: number,
  ): Promise<MSCommunicate> {
    const duyTuDiemDung = await this.duyTuDiemDungRepository.find({
      where: {
        diemDung: {
          id: diemDungId,
        },
      },
      relations: {
        duyTu: true,
        diemDung: true,
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.duyTuDiemDungRepository.count();
    const data = {
      duyTuDiemDung: duyTuDiemDung,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_DIEM_DUNG,
      data,
      Field.READ,
    );
  }

  async findOneById(id: number): Promise<MSCommunicate> {
    const duyTu = await this.duyTuDiemDungRepository.findOne({
      relations: {
        duyTu: true,
        diemDung: true,
      },
      where: { id: id },
    });
    if (!duyTu) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_DIEM_DUNG,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_DIEM_DUNG,
      duyTu,
      Field.READ,
    );
  }

  async createOne(payload: IDuyTuDiemDung): Promise<MSCommunicate> {
    const tinhTrangExist = await this.tinhTrangRepository.findOne({
      where: { id: payload.tinhTrangId },
    });

    if (!tinhTrangExist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_DIEM_DUNG,
        null,
        Field.TINH_TRANG_ID,
      );
    }

    const diemDungExist = await this.diemDungRepository.findOne({
      where: { id: payload.diemDungId },
    });

    if (!diemDungExist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_DIEM_DUNG,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    const duyTuExist = await this.duyTuRepository.findOne({
      where: { id: payload.duyTuId },
    });

    if (!duyTuExist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_DIEM_DUNG,
        null,
        Field.DUY_TU_ID,
      );
    }

    const duyTuDiemDung = await this.duyTuDiemDungRepository.save({
      ngayApDung: payload.ngayApDung,
      tinhTrangDiemDung: {
        id: payload.tinhTrangId,
      },
      ghiChu: payload.ghiChu,
      chiTietTinhTrang: payload.chiTietTinhTrang,
      diemDung: {
        id: payload.diemDungId,
      },
      duyTu: {
        id: payload.duyTuId,
      },
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_DIEM_DUNG,
      duyTuDiemDung,
      Field.CREATE,
    );
  }

  async updateOne(id: number, payload: IDuyTuDiemDung): Promise<MSCommunicate> {
    const exist = await this.duyTuDiemDungRepository.findOne({
      where: { id: id },
    });

    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_DIEM_DUNG,
        null,
        Field.UPDATE,
      );
    }

    const duyTuExist = await this.duyTuRepository.findOne({
      where: { id: payload.duyTuId },
    });

    if (!duyTuExist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_DIEM_DUNG,
        null,
        Field.DUY_TU_ID,
      );
    }

    const data = await this.duyTuDiemDungRepository.save({
      id: exist.id,
      ngayApDung: CommonHelper.opposite(payload.ngayApDung, exist.ngayApDung),
      tinhTrangDiemDung: {
        id: CommonHelper.opposite(payload.tinhTrangId, exist.tinhTrangDiemDung),
      },
      ghiChu: CommonHelper.opposite(payload.ghiChu, exist.ghiChu),
      chiTietTinhTrang: CommonHelper.opposite(
        payload.chiTietTinhTrang,
        exist.chiTietTinhTrang,
      ),
      diemDung: {
        id: CommonHelper.opposite(payload.diemDungId, exist.diemDung),
      },
      duyTu: {
        id: CommonHelper.opposite(payload.duyTuId, exist.duyTu),
      },
    });

    const duyTuDiemDung = await this.duyTuDiemDungRepository.save(data);

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_DIEM_DUNG,
      duyTuDiemDung,
      Field.UPDATE,
    );
  }

  async softDelete(id: number) {
    const exist = await this.duyTuDiemDungRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_DIEM_DUNG,
        null,
        Field.DELETE,
      );
    }
    await this.duyTuDiemDungRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_DIEM_DUNG,
      id,
      Field.DELETE,
    );
  }
}

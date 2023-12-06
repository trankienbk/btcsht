import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Repository } from 'typeorm';
import { DuyTuNhaChoEntity } from '../entities/duy-tu-nha-cho.entity';
import { IDuyTuNhaCho } from '../interface/duy-tu-nha_cho.interface';
import { NhaChoEntity } from '../entities/nha-cho.entity';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';
import { TinhTrangEntity } from '../../tinhtrang/entities/tinh-trang.entity';
import { DanhMucDuyTuEntity } from 'src/modules/duytu/entities/danh-muc-duy-tu.entity';
import CommonHelper from 'src/utils/common.util';

@Injectable()
export class DuyTuNhaChoService {
  constructor(
    @InjectRepository(DuyTuNhaChoEntity)
    private duyTuNhaChoRepository: Repository<DuyTuNhaChoEntity>,
    @InjectRepository(TinhTrangEntity)
    private tinhTrangRepository: Repository<TinhTrangEntity>,
    @InjectRepository(NhaChoEntity)
    private nhaChoRepository: Repository<NhaChoEntity>,
    @InjectRepository(DanhMucDuyTuEntity)
    private duyTuRepository: Repository<DanhMucDuyTuEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    nhaChoId: number,
  ): Promise<MSCommunicate> {
    const duyTuNhaCho = await this.duyTuNhaChoRepository.find({
      where: {
        nhaCho: {
          id: nhaChoId,
        },
      },
      relations: {
        thanhPhan: true,
        tinhTrang: true,
        duyTu: true,
        nhaCho: true,
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.duyTuNhaChoRepository.count();
    const data = {
      duyTuNhaCho: duyTuNhaCho,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_NHA_CHO,
      data,
      Field.READ,
    );
  }

  async findOne(id: number): Promise<MSCommunicate> {
    const duyTu = await this.duyTuNhaChoRepository.findOne({
      relations: {
        tinhTrang: true,
        duyTu: true,
        nhaCho: true,
        thanhPhan: true,
      },
      where: { id: id },
    });
    if (!duyTu) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_NHA_CHO,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_NHA_CHO,
      duyTu,
      Field.READ,
    );
  }

  async create(payload: IDuyTuNhaCho): Promise<MSCommunicate> {
    const tinhTrangExist = await this.tinhTrangRepository.findOne({
      where: { id: payload.tinhTrangId },
    });

    if (!tinhTrangExist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_NHA_CHO,
        null,
        Field.TINH_TRANG_ID,
      );
    }

    const NhaChoExist = await this.nhaChoRepository.findOne({
      where: { id: payload.nhaChoId },
    });

    if (!NhaChoExist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_NHA_CHO,
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
        Subject.DUY_TU_NHA_CHO,
        null,
        Field.DUY_TU_ID,
      );
    }

    const duyTuNhaCho = await this.duyTuNhaChoRepository.save({
      ngayApDung: payload.ngayApDung,
      tinhTrang: {
        id: payload.tinhTrangId,
      },
      thanhPhan: {
        id: payload.thanhPhan,
      },
      ghiChu: payload.ghiChu,
      chiTietTinhTrang: payload.chiTietTinhTrang,
      NhaCho: {
        id: payload.nhaChoId,
      },
      duyTu: {
        id: payload.duyTuId,
      },
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_NHA_CHO,
      duyTuNhaCho,
      Field.CREATE,
    );
  }

  async update(id: number, payload: IDuyTuNhaCho): Promise<MSCommunicate> {
    const exist = await this.duyTuNhaChoRepository.findOne({
      where: { id: id },
    });

    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_NHA_CHO,
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
        Subject.DUY_TU_NHA_CHO,
        null,
        Field.DUY_TU_ID,
      );
    }

    const data = await this.duyTuNhaChoRepository.save({
      id: exist.id,
      ngayApDung: CommonHelper.opposite(payload.ngayApDung, exist.ngayApDung),
      tinhTrang: {
        id: CommonHelper.opposite(payload.tinhTrangId, exist.tinhTrang),
      },
      ghiChu: CommonHelper.opposite(payload.ghiChu, exist.ghiChu),
      chiTietTinhTrang: CommonHelper.opposite(
        payload.chiTietTinhTrang,
        exist.chiTietTinhTrang,
      ),
      thanhPhan: {
        id: CommonHelper.opposite(payload.thanhPhan, exist.thanhPhan),
      },
      NhaCho: {
        id: CommonHelper.opposite(payload.nhaChoId, exist.nhaCho),
      },
      duyTu: {
        id: CommonHelper.opposite(payload.duyTuId, exist.duyTu),
      },
    });

    const duyTuNhaCho = await this.duyTuNhaChoRepository.save(data);

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_NHA_CHO,
      duyTuNhaCho,
      Field.UPDATE,
    );
  }

  async delete(id: number) {
    const exist = await this.duyTuNhaChoRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_NHA_CHO,
        null,
        Field.DELETE,
      );
    }
    await this.duyTuNhaChoRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_NHA_CHO,
      id,
      Field.DELETE,
    );
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Repository } from 'typeorm';
import { DuyTuPanoEntity } from '../entities/duy-tu-pano.entity';
import { IDuyTuPano } from '../interface/duy-tu-pano.interface';
import { PanoEntity } from '../entities/pano.entity';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';
import { TinhTrangEntity } from '../../tinhtrang/entities/tinh-trang.entity';
import { DanhMucDuyTuEntity } from 'src/modules/duytu/entities/danh-muc-duy-tu.entity';
import CommonHelper from 'src/utils/common.util';

@Injectable()
export class DuyTuPanoService {
  constructor(
    @InjectRepository(DuyTuPanoEntity)
    private duyTuPanoRepository: Repository<DuyTuPanoEntity>,
    @InjectRepository(TinhTrangEntity)
    private tinhTrangRepository: Repository<TinhTrangEntity>,
    @InjectRepository(PanoEntity)
    private PanoRepository: Repository<PanoEntity>,
    @InjectRepository(DanhMucDuyTuEntity)
    private duyTuRepository: Repository<DanhMucDuyTuEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    panoId: number,
  ): Promise<MSCommunicate> {
    const duyTuPano = await this.duyTuPanoRepository.find({
      where: {
        Pano: {
          id: panoId,
        },
      },
      relations: {
        thanhPhan: true,
        tinhTrang: true,
        duyTu: true,
        Pano: true,
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.duyTuPanoRepository.count();
    const data = {
      duyTuPano: duyTuPano,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_PANO,
      data,
      Field.READ,
    );
  }

  async findOneById(id: number): Promise<MSCommunicate> {
    const duyTu = await this.duyTuPanoRepository.findOne({
      relations: {
        tinhTrang: true,
        duyTu: true,
        Pano: true,
        thanhPhan: true,
      },
      where: { id: id },
    });
    if (!duyTu) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_PANO,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_PANO,
      duyTu,
      Field.READ,
    );
  }

  async createOne(payload: IDuyTuPano): Promise<MSCommunicate> {
    const tinhTrangExist = await this.tinhTrangRepository.findOne({
      where: { id: payload.tinhTrangId },
    });

    if (!tinhTrangExist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_PANO,
        null,
        Field.TINH_TRANG_ID,
      );
    }

    const PanoExist = await this.PanoRepository.findOne({
      where: { id: payload.PanoId },
    });

    if (!PanoExist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_PANO,
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
        Subject.DUY_TU_PANO,
        null,
        Field.DUY_TU_ID,
      );
    }

    const duyTuPano = await this.duyTuPanoRepository.save({
      ngayApDung: payload.ngayApDung,
      tinhTrang: {
        id: payload.tinhTrangId,
      },
      thanhPhan: {
        id: payload.thanhPhan,
      },
      ghiChu: payload.ghiChu,
      chiTietTinhTrang: payload.chiTietTinhTrang,
      Pano: {
        id: payload.PanoId,
      },
      duyTu: {
        id: payload.duyTuId,
      },
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_PANO,
      duyTuPano,
      Field.CREATE,
    );
  }

  async updateOne(id: number, payload: IDuyTuPano): Promise<MSCommunicate> {
    const exist = await this.duyTuPanoRepository.findOne({
      where: { id: id },
    });

    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_PANO,
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
        Subject.DUY_TU_PANO,
        null,
        Field.DUY_TU_ID,
      );
    }

    const data = await this.duyTuPanoRepository.save({
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
      Pano: {
        id: CommonHelper.opposite(payload.PanoId, exist.Pano),
      },
      duyTu: {
        id: CommonHelper.opposite(payload.duyTuId, exist.duyTu),
      },
    });

    const duyTuPano = await this.duyTuPanoRepository.save(data);

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_PANO,
      duyTuPano,
      Field.UPDATE,
    );
  }

  async softDelete(id: number) {
    const exist = await this.duyTuPanoRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_PANO,
        null,
        Field.DELETE,
      );
    }
    await this.duyTuPanoRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_PANO,
      id,
      Field.DELETE,
    );
  }
}

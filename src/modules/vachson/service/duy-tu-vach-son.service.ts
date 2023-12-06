import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Repository } from 'typeorm';
import { DuyTuVachSonEntity } from '../entities/duy-tu-vach-son.entity';
import { IDuyTuVachSon } from '../interface/duy-tu-vach-son.interface';
import { VachSonEntity } from '../entities/vach-son.entity';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';
import { TinhTrangEntity } from '../../tinhtrang/entities/tinh-trang.entity';
import { DanhMucDuyTuEntity } from 'src/modules/duytu/entities/danh-muc-duy-tu.entity';
import CommonHelper from 'src/utils/common.util';

@Injectable()
export class DuyTuVachSonService {
  constructor(
    @InjectRepository(DuyTuVachSonEntity)
    private duyTuVachSonRepository: Repository<DuyTuVachSonEntity>,
    @InjectRepository(TinhTrangEntity)
    private tinhTrangRepository: Repository<TinhTrangEntity>,
    @InjectRepository(VachSonEntity)
    private VachSonRepository: Repository<VachSonEntity>,
    @InjectRepository(DanhMucDuyTuEntity)
    private duyTuRepository: Repository<DanhMucDuyTuEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    vachSonId: number,
  ): Promise<MSCommunicate> {
    const duyTuVachSon = await this.duyTuVachSonRepository.find({
      where: {
        vachSon: {
          id: vachSonId,
        },
      },
      relations: {
        thanhPhan: true,
        tinhTrang: true,
        duyTu: true,
        vachSon: true,
      },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.duyTuVachSonRepository.count();
    const data = {
      duyTuVachSon: duyTuVachSon,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_VACH_SON,
      data,
      Field.READ,
    );
  }

  async findOneById(id: number): Promise<MSCommunicate> {
    const duyTu = await this.duyTuVachSonRepository.findOne({
      relations: {
        tinhTrang: true,
        duyTu: true,
        vachSon: true,
        thanhPhan: true,
      },
      where: { id: id },
    });
    if (!duyTu) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_VACH_SON,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_VACH_SON,
      duyTu,
      Field.READ,
    );
  }

  async createOne(payload: IDuyTuVachSon): Promise<MSCommunicate> {
    const tinhTrangExist = await this.tinhTrangRepository.findOne({
      where: { id: payload.tinhTrangId },
    });

    if (!tinhTrangExist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_VACH_SON,
        null,
        Field.TINH_TRANG_ID,
      );
    }

    const VachSonExist = await this.VachSonRepository.findOne({
      where: { id: payload.vachSonId },
    });

    if (!VachSonExist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_VACH_SON,
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
        Subject.DUY_TU_VACH_SON,
        null,
        Field.DUY_TU_ID,
      );
    }

    const duyTuVachSon = await this.duyTuVachSonRepository.save({
      ngayApDung: payload.ngayApDung,
      tinhTrang: {
        id: payload.tinhTrangId,
      },
      thanhPhan: {
        id: payload.thanhPhan,
      },
      ghiChu: payload.ghiChu,
      chiTietTinhTrang: payload.chiTietTinhTrang,
      vachSon: {
        id: payload.vachSonId,
      },
      duyTu: {
        id: payload.duyTuId,
      },
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_VACH_SON,
      duyTuVachSon,
      Field.CREATE,
    );
  }

  async updateOne(id: number, payload: IDuyTuVachSon): Promise<MSCommunicate> {
    const exist = await this.duyTuVachSonRepository.findOne({
      where: { id: id },
    });

    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_VACH_SON,
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
        Subject.DUY_TU_VACH_SON,
        null,
        Field.DUY_TU_ID,
      );
    }

    const data = await this.duyTuVachSonRepository.save({
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
      vachSon: {
        id: CommonHelper.opposite(payload.vachSonId, exist.vachSon),
      },
      duyTu: {
        id: CommonHelper.opposite(payload.duyTuId, exist.duyTu),
      },
    });

    const duyTuVachSon = await this.duyTuVachSonRepository.save(data);

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_VACH_SON,
      duyTuVachSon,
      Field.UPDATE,
    );
  }

  async softDelete(id: number) {
    const exist = await this.duyTuVachSonRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DUY_TU_VACH_SON,
        null,
        Field.DELETE,
      );
    }
    await this.duyTuVachSonRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DUY_TU_VACH_SON,
      id,
      Field.DELETE,
    );
  }
}

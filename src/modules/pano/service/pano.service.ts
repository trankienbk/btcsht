import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Not, Repository } from 'typeorm';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';
import { PanoEntity } from '../entities/pano.entity';
import { IPano } from '../interface/pano.interface';
import { TinhTrangEntity } from 'src/modules/tinhtrang/entities/tinh-trang.entity';
import { DanhMucPanoEntity } from '../entities/danh-muc-pano.entity';
import { DiemDungEntity } from 'src/modules/diemdung/entities/diem-dung.entity';
import { DuyTuPanoEntity } from '../entities/duy-tu-pano.entity';
import { DanhMucDuyTuEntity } from 'src/modules/duytu/entities/danh-muc-duy-tu.entity';

@Injectable()
export class PanoService {
  constructor(
    @InjectRepository(PanoEntity)
    private PanoRepository: Repository<PanoEntity>,
    @InjectRepository(TinhTrangEntity)
    private tinhTrangRepository: Repository<TinhTrangEntity>,
    @InjectRepository(DanhMucPanoEntity)
    private loaiPanoRepository: Repository<DanhMucPanoEntity>,
    @InjectRepository(DiemDungEntity)
    private diemDungRepository: Repository<DiemDungEntity>,
    @InjectRepository(DuyTuPanoEntity)
    private duyTuPanoRepository: Repository<DuyTuPanoEntity>,
    @InjectRepository(DanhMucDuyTuEntity)
    private duyTuRepository: Repository<DanhMucDuyTuEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const Pano = await this.PanoRepository.find({
      relations: {
        pano: true,
        diemDungPano: true,
      },
      where: { name: Like(`%${name ?? ''}%`) },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.PanoRepository.count();
    const data = {
      pano: Pano,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.PANO,
      data,
      Field.READ,
    );
  }

  async findOne(id: number): Promise<MSCommunicate> {
    const roadMakings = await this.PanoRepository.findOne({
      relations: {
        pano: true,
        diemDungPano: true,
      },
      where: { id: id },
    });

    if (!roadMakings) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.PANO,
        null,
        Field.READ,
      );
    }

    const duyTuPano = await this.duyTuPanoRepository.find({
      relations: {
        tinhTrang: true,
      },
      where: {
        Pano: {
          id: roadMakings.id,
        },
      },
      order: {
        ngayApDung: 'DESC',
      },
      take: 1,
    });

    const result = {
      ...roadMakings,
      tinhTrang: duyTuPano[0].tinhTrang,
    };

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.PANO,
      result,
      Field.READ,
    );
  }

  async create(data: IPano): Promise<MSCommunicate> {
    const exist = await this.PanoRepository.findOne({
      where: { name: data.payload.name },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.PANO,
        null,
        Field.NAME,
      );
    }

    const existTinhTrang = await this.tinhTrangRepository.findOne({
      where: { id: data.payload.tinhTrangId },
    });

    if (!existTinhTrang) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.PANO,
        null,
        Field.TINH_TRANG_ID,
      );
    }

    const existLoaiPano = await this.loaiPanoRepository.findOne({
      where: { id: data.payload.loaiPanoId },
    });

    if (!existLoaiPano) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.PANO,
        null,
        Field.LOAI_PANO_ID,
      );
    }

    const existDiemDung = await this.diemDungRepository.findOne({
      where: { id: data.payload.diemDungId },
    });

    if (!existDiemDung) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.PANO,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    const roadMakings = await this.PanoRepository.save({
      name: data.payload.name,
      mongDescription: data.payload.mongDescription,
      vatLieu: data.payload.vatLieu,
      namDauTu: data.payload.namDauTu,
      viTri: data.payload.viTri,
      thongTin: data.payload.thongTin,
      chieuDai: data.payload.chieuDai,
      chieuRong: data.payload.chieuRong,
      ghiChu: data.payload.ghiChu,
      pano: {
        id: data.payload.loaiPanoId,
      },
      idFile: JSON.stringify(data.idFile),
      diemDungPano: {
        id: data.payload.diemDungId,
      },
    });

    const objectDuyTu = await this.duyTuRepository.findOne({
      where: { name: 'Chưa thực hiện duy tu' },
    });

    await this.duyTuPanoRepository.save({
      ngayApDung: new Date(),
      tinhTrang: {
        id: data.payload.tinhTrangId,
      },
      Pano: {
        id: roadMakings.id,
      },
      duyTu: {
        id: objectDuyTu.id,
      },
      thanhPhan: {
        id: 17,
      },
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.PANO,
      roadMakings,
      Field.CREATE,
    );
  }

  async update(
    id: number,
    payload: any,
    idFile: number[],
  ): Promise<MSCommunicate> {
    const exist = await this.PanoRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.PANO,
        null,
        Field.UPDATE,
      );
    }

    const existName = await this.PanoRepository.findOne({
      where: { name: payload.name, id: Not(exist.id) },
    });
    if (existName) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.PANO,
        null,
        Field.NAME,
      );
    }

    const existTinhTrang = await this.tinhTrangRepository.findOne({
      where: { id: payload.tinhTrangId },
    });

    if (!existTinhTrang) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.PANO,
        null,
        Field.TINH_TRANG_ID,
      );
    }

    const existLoaiPano = await this.loaiPanoRepository.findOne({
      where: { id: payload.loaiPanoId },
    });

    if (!existLoaiPano) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.PANO,
        null,
        Field.LOAI_PANO_ID,
      );
    }

    const existDiemDung = await this.diemDungRepository.findOne({
      where: { id: payload.diemDungId },
    });

    if (!existDiemDung) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.PANO,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    const data = {
      id: exist.id,
      name: payload.name || exist.name,
      mongDescription: payload.mongDescription || exist.mongDescription,
      vatLieu: payload.vatLieu || exist.vatLieu,
      namDauTu: payload.namDauTu || exist.namDauTu,
      viTri: payload.viTri || exist.viTri,
      thongTin: payload.thongTin || exist.thongTin,
      chieuDai: payload.chieuDai || exist.chieuDai,
      chieuRong: payload.chieuRong || exist.chieuRong,
      ghiChu: payload.ghiChu || exist.ghiChu,
      pano: {
        id: payload.loaiPanoId || exist.pano,
      },
      idFile: JSON.stringify(idFile) || exist.idFile,
      diemDungPano: {
        id: payload.diemDungId || exist.diemDungPano,
      },
    };

    const roadMakings = await this.PanoRepository.save(data);

    const duyTuPano = await this.duyTuPanoRepository.find({
      where: {
        Pano: {
          id: id,
        },
      },
      order: {
        ngayApDung: 'DESC',
      },
      take: 1,
    });

    await this.duyTuPanoRepository.save({
      id: duyTuPano[0].id,
      tinhTrang: {
        id: existTinhTrang.id,
      },
    });

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.PANO,
      roadMakings,
      Field.UPDATE,
    );
  }

  async delete(id: number): Promise<MSCommunicate> {
    const exist = await this.PanoRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.PANO,
        null,
        Field.DELETE,
      );
    }
    await this.PanoRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.PANO,
      id,
      Field.DELETE,
    );
  }
}

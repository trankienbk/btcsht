import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import { TinhTrangEntity } from 'src/modules/tinhtrang/entities/tinh-trang.entity';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Repository } from 'typeorm';
import { DanhMucNhaChoEntity } from '../entities/danh-muc-nha-cho.entity';
import { NhaChoEntity } from '../entities/nha-cho.entity';
import { INhaCho } from '../interface/nha-cho.interface';
import { DiemDungEntity } from 'src/modules/diemdung/entities/diem-dung.entity';
import { DuyTuNhaChoEntity } from '../entities/duy-tu-nha-cho.entity';
import { DanhMucDuyTuEntity } from 'src/modules/duytu/entities/danh-muc-duy-tu.entity';
@Injectable()
export class NhaChoService {
  constructor(
    @InjectRepository(DiemDungEntity)
    private diemDungRepository: Repository<DiemDungEntity>,
    @InjectRepository(NhaChoEntity)
    private nhaChoRepository: Repository<NhaChoEntity>,
    @InjectRepository(DanhMucNhaChoEntity)
    private loaiNhaChoRepository: Repository<DanhMucNhaChoEntity>,
    @InjectRepository(TinhTrangEntity)
    private tinhTrangRepository: Repository<TinhTrangEntity>,
    @InjectRepository(DuyTuNhaChoEntity)
    private duyTuNhaChoRepository: Repository<DuyTuNhaChoEntity>,
    @InjectRepository(DanhMucDuyTuEntity)
    private duyTuRepository: Repository<DanhMucDuyTuEntity>,
  ) {}

  async findMany(
    offset: number,
    limit: number,
    filter: string,
  ): Promise<MSCommunicate> {
    const nhaChos = await this.nhaChoRepository.find({
      where: { name: Like(`%${filter ?? ''}%`) },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.nhaChoRepository.count();
    const data = {
      nhaChos: nhaChos,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.NHA_CHO,
      data,
      Field.READ,
    );
  }

  async findOneById(id: number): Promise<MSCommunicate> {
    const data = await this.nhaChoRepository.findOne({
      relations: {
        loaiNhaCho: true,
      },
      where: { id: id },
    });
    if (!data)
      return new MSCommunicate(
        HttpStatus.OK,
        Content.NOT_FOUND,
        Subject.NHA_CHO,
        null,
        Field.READ,
      );

    const duyTuNhaCho = await this.duyTuNhaChoRepository.find({
      relations: {
        tinhTrang: true,
      },
      where: {
        nhaCho: {
          id: data.id,
        },
      },
      order: {
        ngayApDung: 'DESC',
      },
      take: 1,
    });

    const result = {
      ...data,
      tinhTrang: duyTuNhaCho[0].tinhTrang,
    };

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.NHA_CHO,
      result,
      Field.READ,
    );
  }

  async createOne(data: INhaCho): Promise<MSCommunicate> {
    // check exist diem dung
    const checkExistDiemDung = await this.diemDungRepository.findOne({
      where: {
        id: data.payload.diemDungId,
      },
    });
    if (!checkExistDiemDung)
      return new MSCommunicate(
        HttpStatus.OK,
        Content.NOT_FOUND,
        Subject.NHA_CHO,
        null,
        Field.DIEM_DUNG_ID,
      );

    // check exist loai nha cho
    const checkExistLoaiNhaCho = await this.loaiNhaChoRepository.findOne({
      where: {
        id: data.payload.loaiNhaChoId,
      },
    });

    if (!checkExistLoaiNhaCho)
      return new MSCommunicate(
        HttpStatus.OK,
        Content.NOT_FOUND,
        Subject.NHA_CHO,
        null,
        Field.LOAI_NHA_CHO_ID,
      );

    // check exist tinh trang doi tuong
    const checkExistTinhTrang = await this.tinhTrangRepository.findOne({
      where: {
        id: data.payload.tinhTrangId,
      },
    });
    if (!checkExistTinhTrang)
      return new MSCommunicate(
        HttpStatus.OK,
        Content.NOT_FOUND,
        Subject.NHA_CHO,
        null,
        Field.TINH_TRANG_ID,
      );

    const nhaCho: NhaChoEntity = await this.nhaChoRepository.save({
      diemDung: {
        id: data.payload.diemDungId,
      },
      name: data.payload.name,
      loaiNhaCho: {
        id: data.payload.loaiNhaChoId,
      },
      tinhTrang: {
        id: data.payload.tinhTrangId,
      },
      chieuDai: data.payload.chieuDai,
      chieuRong: data.payload.chieuRong,
      namDauTu: new Date(data.payload.namDauTu),
      note: data.payload.note,
      idFile: JSON.stringify(data.idFile),
      chieuDaiMai: data.payload.chieuDaiMai,
      chieuRongMai: data.payload.chieuRongMai,
      vatLieuMai: data.payload.vatLieuMai,
      chieuDaiCot: data.payload.chieuDaiCot,
      duongKinhCot: data.payload.duongKinhCot,
      vatLieuCot: data.payload.vatLieuCot,
      mauSacCot: data.payload.mauSacCot,
      chieuDaiKhung: data.payload.chieuDaiKhung,
      chieuRongKhung: data.payload.chieuRong,
      vatLieuKhung: data.payload.vatLieuKhung,
      chieuDaiGhe: data.payload.chieuDaiGhe,
      vatLieuGhe: data.payload.vatLieuGhe,
      chieuDaiTamMica: data.payload.chieuDaiTamMica,
      chieuRongTamMica: data.payload.chieuRongTamMica,
      descriptionTamMica: data.payload.descriptionTamMica,
      descriptionMong: data.payload.descriptionMong,
      descriptionLung: data.payload.descriptionLung,
      descriptionHong: data.payload.descriptionHong,
      descriptionHoi: data.payload.descriptionHoi,
    });

    const objectDuyTu = await this.duyTuRepository.findOne({
      where: { name: 'Chưa thực hiện duy tu' },
    });

    await this.duyTuNhaChoRepository.save({
      ngayApDung: new Date(),
      tinhTrang: {
        id: data.payload.tinhTrangId,
      },
      nhaCho: {
        id: nhaCho.id,
      },
      duyTu: {
        id: objectDuyTu.id,
      },
      thanhPhan: {
        id: 8,
      },
    });
    // return data
    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.NHA_CHO,
      nhaCho,
      Field.CREATE,
    );
  }

  async updateOne(
    id: number,
    payload: any,
    idFile: number[],
  ): Promise<MSCommunicate> {
    // check diem dung need to update
    const checkExistNhaCho = await this.nhaChoRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        diemDung: true,
        loaiNhaCho: true,
      },
    });
    if (!checkExistNhaCho)
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.NHA_CHO,
        null,
        Field.UPDATE,
      );

    // check exist diem dung if client send
    const checkExistDiemDung =
      payload.diemDungId &&
      (await this.diemDungRepository.findOne({
        where: {
          id: payload.diemDungId,
        },
      }));
    if (!checkExistDiemDung)
      return new MSCommunicate(
        HttpStatus.OK,
        Content.NOT_FOUND,
        Subject.NHA_CHO,
        null,
        Field.DIEM_DUNG_ID,
      );

    // check exist loai nha cho if client send
    const checkExistLoaiNhaCho =
      payload.loaiNhaChoId &&
      (await this.loaiNhaChoRepository.findOne({
        where: {
          id: payload.loaiNhaChoId,
        },
      }));

    if (payload.loaiNhaChoId && !checkExistLoaiNhaCho)
      return new MSCommunicate(
        HttpStatus.BAD_REQUEST,
        Content.NOT_FOUND,
        Subject.NHA_CHO,
        null,
        Field.LOAI_NHA_CHO_ID,
      );

    // save data
    const data = await this.nhaChoRepository.save({
      id: checkExistNhaCho.id,
      diemDung: {
        id: payload.diemDungId || checkExistNhaCho.diemDung.id,
      },
      name: payload.name || checkExistNhaCho.name,
      loaiNhaCho: {
        id: payload.loaiNhaChoId || checkExistNhaCho.loaiNhaCho.id,
      },
      chieuDai: payload.chieuDai || checkExistNhaCho.chieuDai,
      chieuRong: payload.chieuRong || checkExistNhaCho.chieuRong,
      namDauTu: payload.namDauTu
        ? new Date(payload.namDauTu)
        : new Date(checkExistNhaCho.namDauTu),
      note: payload.note || checkExistNhaCho.note,
      idFile: JSON.stringify(idFile) || checkExistNhaCho.idFile,
      chieuDaiMai: payload.chieuDaiMai || checkExistNhaCho.chieuDaiMai,
      chieuRongMai: payload.chieuRongMai || checkExistNhaCho.chieuRongMai,
      vatLieuMai: payload.vatLieuMai || checkExistNhaCho.vatLieuMai,
      chieuDaiCot: payload.chieuDaiCot || checkExistNhaCho.chieuDaiCot,
      duongKinhCot: payload.duongKinhCot || checkExistNhaCho.duongKinhCot,
      vatLieuCot: payload.vatLieuCot || checkExistNhaCho.vatLieuCot,
      mauSacCot: payload.mauSacCot || checkExistNhaCho.mauSacCot,
      chieuDaiKhung: payload.chieuDaiKhung || checkExistNhaCho.chieuDaiKhung,
      chieuRongKhung: payload.chieuRongKhung || checkExistNhaCho.chieuRongKhung,
      vatLieuKhung: payload.vatLieuKhung || checkExistNhaCho.vatLieuKhung,
      chieuDaiGhe: payload.chieuDaiGhe || checkExistNhaCho.chieuDaiGhe,
      vatLieuGhe: payload.vatLieuGhe || checkExistNhaCho.vatLieuGhe,
      chieuDaiTamMica:
        payload.chieuDaiTamMica || checkExistNhaCho.chieuDaiTamMica,
      chieuRongTamMica:
        payload.chieuRongTamMica || checkExistNhaCho.chieuRongTamMica,
      descriptionTamMica:
        payload.descriptionTamMica || checkExistNhaCho.descriptionTamMica,
      descriptionMong:
        payload.descriptionMong || checkExistNhaCho.descriptionMong,
      descriptionLung:
        payload.descriptionLung || checkExistNhaCho.descriptionLung,
      descriptionHong:
        payload.descriptionHong || checkExistNhaCho.descriptionHong,
      descriptionHoi: payload.descriptionHoi || checkExistNhaCho.descriptionHoi,
    });

    const duyTuNhaCho = await this.duyTuNhaChoRepository.find({
      where: {
        nhaCho: {
          id: id,
        },
      },
      order: {
        ngayApDung: 'DESC',
      },
      take: 1,
    });

    await this.duyTuNhaChoRepository.save({
      id: duyTuNhaCho[0].id,
      tinhTrang: {
        id: data.id,
      },
    });

    return new MSCommunicate(
      HttpStatus.ACCEPTED,
      Content.SUCCESSFULLY,
      Subject.NHA_CHO,
      data,
      Field.UPDATE,
    );
  }

  async softDelete(id: number) {
    const checkExistNhaCho = await this.nhaChoRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!checkExistNhaCho)
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.NHA_CHO,
        null,
        Field.DELETE,
      );
    await this.nhaChoRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.NHA_CHO,
      id,
      Field.DELETE,
    );
  }
}

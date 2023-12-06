import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Not, Repository } from 'typeorm';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';
import { VachSonEntity } from '../entities/vach-son.entity';
import { IVachSon } from '../interface/vach-son.interface';
import { TinhTrangEntity } from 'src/modules/tinhtrang/entities/tinh-trang.entity';
import { DanhMucVachSonEntity } from '../entities/danh-muc-vach-son.entity';
import { DiemDungEntity } from 'src/modules/diemdung/entities/diem-dung.entity';
import { DuyTuVachSonEntity } from '../entities/duy-tu-vach-son.entity';
import { DanhMucDuyTuEntity } from 'src/modules/duytu/entities/danh-muc-duy-tu.entity';

@Injectable()
export class VachSonService {
  constructor(
    @InjectRepository(VachSonEntity)
    private vachSonRepository: Repository<VachSonEntity>,
    @InjectRepository(TinhTrangEntity)
    private tinhTrangRepository: Repository<TinhTrangEntity>,
    @InjectRepository(DanhMucVachSonEntity)
    private loaiVachSonRepository: Repository<DanhMucVachSonEntity>,
    @InjectRepository(DiemDungEntity)
    private diemDungRepository: Repository<DiemDungEntity>,
    @InjectRepository(DuyTuVachSonEntity)
    private duyTuVachSonRepository: Repository<DuyTuVachSonEntity>,
    @InjectRepository(DanhMucDuyTuEntity)
    private duyTuRepository: Repository<DanhMucDuyTuEntity>,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const vachSon = await this.vachSonRepository.find({
      relations: {
        vachSon: true,
        diemDungVachSon: true,
      },
      where: { name: Like(`%${name ?? ''}%`) },
      skip: limit && offset,
      take: limit,
    });

    const total = await this.vachSonRepository.count();
    const data = {
      roadMakings: vachSon,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.VACH_SON,
      data,
      Field.READ,
    );
  }

  async findOne(id: number): Promise<MSCommunicate> {
    const roadMakings = await this.vachSonRepository.findOne({
      relations: {
        vachSon: true,
        diemDungVachSon: true,
      },
      where: { id: id },
    });
    if (!roadMakings) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.VACH_SON,
        null,
        Field.READ,
      );
    }
    const duyTuVachSon = await this.duyTuVachSonRepository.find({
      relations: {
        tinhTrang: true,
      },
      where: {
        vachSon: {
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
      tinhTrang: duyTuVachSon[0].tinhTrang,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.VACH_SON,
      result,
      Field.READ,
    );
  }

  async create(data: IVachSon): Promise<MSCommunicate> {
    const exist = await this.vachSonRepository.findOne({
      where: { name: data.payload.name },
    });
    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.VACH_SON,
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
        Subject.VACH_SON,
        null,
        Field.TINH_TRANG_ID,
      );
    }

    const existLoaiVachSon = await this.loaiVachSonRepository.findOne({
      where: { id: data.payload.loaiVachSonId },
    });

    if (!existLoaiVachSon) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.VACH_SON,
        null,
        Field.LOAI_VACH_SON_ID,
      );
    }

    const existDiemDung = await this.diemDungRepository.findOne({
      where: { id: data.payload.diemDungId },
    });

    if (!existDiemDung) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.VACH_SON,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    const roadMakings = await this.vachSonRepository.save({
      name: data.payload.name,
      description: data.payload.description,
      chieuDai: data.payload.chieuDai,
      chieuRong: data.payload.chieuRong,
      vachSon: {
        id: data.payload.loaiVachSonId,
      },
      idFile: JSON.stringify(data.idFile),
      diemDungVachSon: {
        id: data.payload.diemDungId,
      },
    });

    const objectDuyTu = await this.duyTuRepository.findOne({
      where: { name: 'Chưa thực hiện duy tu' },
    });

    await this.duyTuVachSonRepository.save({
      ngayApDung: new Date(),
      tinhTrang: {
        id: data.payload.tinhTrangId,
      },
      vachSon: {
        id: roadMakings.id,
      },
      duyTu: {
        id: objectDuyTu.id,
      },
      thanhPhan: {
        id: 7,
      },
    });

    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.VACH_SON,
      roadMakings,
      Field.CREATE,
    );
  }

  async update(
    id: number,
    payload: any,
    idFile: number[],
  ): Promise<MSCommunicate> {
    const exist = await this.vachSonRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.VACH_SON,
        null,
        Field.UPDATE,
      );
    }

    const existName = await this.vachSonRepository.findOne({
      where: { name: payload.name, id: Not(exist.id) },
    });
    if (existName) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.VACH_SON,
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
        Subject.VACH_SON,
        null,
        Field.TINH_TRANG_ID,
      );
    }

    const existLoaiVachSon = await this.loaiVachSonRepository.findOne({
      where: { id: payload.loaiVachSonId },
    });

    if (!existLoaiVachSon) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.VACH_SON,
        null,
        Field.LOAI_VACH_SON_ID,
      );
    }

    const existDiemDung = await this.diemDungRepository.findOne({
      where: { id: payload.diemDungId },
    });

    if (!existDiemDung) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.VACH_SON,
        null,
        Field.DIEM_DUNG_ID,
      );
    }

    const data = {
      id: exist.id,
      name: payload.name || exist.name,
      description: payload.description || exist.description,
      chieuDai: payload.chieuDai || exist.chieuDai,
      chieuRong: payload.chieuRong || exist.chieuRong,
      vachSon: {
        id: payload.loaiVachSonId || exist.vachSon,
      },
      idFile: JSON.stringify(idFile) || exist.idFile,
      diemDungVachSon: {
        id: payload.diemDungId || exist.diemDungVachSon,
      },
    };

    const roadMakings = await this.vachSonRepository.save(data);

    const duyTuVachSon = await this.duyTuVachSonRepository.find({
      where: {
        vachSon: {
          id: id,
        },
      },
      order: {
        ngayApDung: 'DESC',
      },
      take: 1,
    });

    await this.duyTuVachSonRepository.save({
      id: duyTuVachSon[0].id,
      tinhTrang: {
        id: existTinhTrang.id,
      },
    });

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.VACH_SON,
      roadMakings,
      Field.UPDATE,
    );
  }

  async delete(id: number): Promise<MSCommunicate> {
    const exist = await this.vachSonRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.VACH_SON,
        null,
        Field.DELETE,
      );
    }
    await this.vachSonRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.VACH_SON,
      id,
      Field.DELETE,
    );
  }
}

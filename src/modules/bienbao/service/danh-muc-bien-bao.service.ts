import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Not, Repository } from 'typeorm';
import { DanhMucBienBaoEntity } from '../entities/danh-muc-bien-bao.entity';
import { IDanhMucBienBao } from '../interface/danh-muc-bien-bao.interface';
import { Content } from 'src/common/message/content.message';
import { Subject } from 'src/common/message/subject.message';
import { Field } from 'src/common/message/field.message';

@Injectable()
export class DanhMucBienBaoService {
  constructor(
    @InjectRepository(DanhMucBienBaoEntity)
    private loaiBienBaoRepository: Repository<DanhMucBienBaoEntity>,
  ) {}

  condition(danhMuc: any) {
    const data = [];
    data.push('isMat');
    if (danhMuc.isMai) data.push('isMai');
    if (danhMuc.isCot) data.push('isCot');
    if (danhMuc.isHop) data.push('isHop');
    if (danhMuc.isDenChieuSang) data.push('isDenChieuSang');
    if (danhMuc.isMong) data.push('isMong');

    return data.join('/');
  }

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
  ): Promise<MSCommunicate> {
    const danhMucBienBaos = await this.loaiBienBaoRepository.find({
      where: { name: Like(`%${name ?? ''}%`) },
      skip: limit && offset,
      take: limit,
      select: {
        id: true,
        name: true,
        description: true,
        isMai: true,
        isCot: true,
        isHop: true,
        isDenChieuSang: true,
        isMong: true,
      },
    });
    const result = danhMucBienBaos.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        config: this.condition(item),
      };
    });

    const total = await this.loaiBienBaoRepository.count();
    const data = {
      trafficSignType: result,
      total: total,
    };
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.LOAI_BIEN_BAO,
      data,
      Field.READ,
    );
  }

  async findOneById(id: number): Promise<MSCommunicate> {
    const danhMucBienBao = await this.loaiBienBaoRepository.findOne({
      where: { id: id },
    });

    if (!danhMucBienBao) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.LOAI_BIEN_BAO,
        null,
        Field.READ,
      );
    }
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.LOAI_BIEN_BAO,
      danhMucBienBao,
      Field.READ,
    );
  }

  async createOne(payload: IDanhMucBienBao): Promise<MSCommunicate> {
    const exist = await this.loaiBienBaoRepository.findOne({
      where: { name: payload.name },
    });

    if (exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.LOAI_BIEN_BAO,
        null,
        Field.NAME,
      );
    }

    const arrayMatTruoc = [
      'so_hieu_tuyen_bus',
      'so_hieu_tuyen_bus_va_diem_dau_cuoi',
    ];
    const arrayMatSau = ['lo_trinh_rut_ngan', 'trung_mat_nuoc'];

    if (!arrayMatTruoc.includes(payload.matTruoc)) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.INVALID,
        Subject.LOAI_BIEN_BAO,
        null,
        Field.MAT_TRUOC,
      );
    }

    if (!arrayMatSau.includes(payload.matSau)) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.INVALID,
        Subject.LOAI_BIEN_BAO,
        null,
        Field.MAT_SAU,
      );
    }

    const danhMucBienBao = await this.loaiBienBaoRepository.save(payload);

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.LOAI_BIEN_BAO,
      danhMucBienBao,
      Field.CREATE,
    );
  }

  async updateOne(
    id: number,
    payload: IDanhMucBienBao,
  ): Promise<MSCommunicate> {
    const exist = await this.loaiBienBaoRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.LOAI_BIEN_BAO,
        null,
        Field.UPDATE,
      );
    }

    const arrayMatTruoc = [
      'so_hieu_tuyen_bus',
      'so_hieu_tuyen_bus_va_diem_dau_cuoi',
    ];
    const arrayMatSau = ['lo_trinh_rut_ngan', 'trung_mat_nuoc'];

    if (!arrayMatTruoc.includes(payload.matTruoc)) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.INVALID,
        Subject.LOAI_BIEN_BAO,
        null,
        Field.MAT_TRUOC,
      );
    }

    if (!arrayMatSau.includes(payload.matSau)) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.INVALID,
        Subject.LOAI_BIEN_BAO,
        null,
        Field.MAT_SAU,
      );
    }

    const existName = await this.loaiBienBaoRepository.findOne({
      where: { name: payload.name, id: Not(exist.id) },
    });
    if (existName) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.EXIST,
        Subject.LOAI_BIEN_BAO,
        null,
        Field.NAME,
      );
    }

    const danhMucBienBaos = await this.loaiBienBaoRepository.save({
      id: exist.id,
      ...payload,
    });

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.LOAI_BIEN_BAO,
      danhMucBienBaos,
      Field.UPDATE,
    );
  }

  async deleteOne(id: number): Promise<MSCommunicate> {
    const exist = await this.loaiBienBaoRepository.findOne({
      where: { id: id },
    });
    if (!exist) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.LOAI_BIEN_BAO,
        null,
        Field.DELETE,
      );
    }
    await this.loaiBienBaoRepository.softDelete(id);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.LOAI_BIEN_BAO,
      id,
      Field.DELETE,
    );
  }
}

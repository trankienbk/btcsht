import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom, timeout } from 'rxjs';
import { Content } from 'src/common/message/content.message';
import { Field } from 'src/common/message/field.message';
import { Subject } from 'src/common/message/subject.message';
import { MSCommunicate } from 'src/utils/ms-output.util';
import { Like, Repository } from 'typeorm';
import { TinhTrangEntity } from '../../tinhtrang/entities/tinh-trang.entity';
import { DiemDungEntity } from '../entities/diem-dung.entity';
import { LoaiDiemDungEntity } from '../entities/loai-diem-dung.entity';
import { IDiemDung } from '../interface/diem-dung.interface';
import { DuyTuDiemDungEntity } from '../entities/duy-tu-diem-dung.entity';
import { DanhMucDuyTuEntity } from '../../duytu/entities/danh-muc-duy-tu.entity';
import CommonHelper from 'src/utils/common.util';
import { DuongService } from 'src/modules/duong/services/duong.service';

@Injectable()
export class DiemDungService {
  constructor(
    @InjectRepository(DiemDungEntity)
    private diemDungRepository: Repository<DiemDungEntity>,
    @InjectRepository(LoaiDiemDungEntity)
    private loaiDiemDungRepository: Repository<LoaiDiemDungEntity>,
    @InjectRepository(TinhTrangEntity)
    private tinhTrangRepository: Repository<TinhTrangEntity>,
    @InjectRepository(DuyTuDiemDungEntity)
    private duyTuDiemDungRepository: Repository<DuyTuDiemDungEntity>,
    @InjectRepository(DanhMucDuyTuEntity)
    private danhMucDuyTuRepository: Repository<DanhMucDuyTuEntity>,
    private duongService: DuongService,
    @Inject('MS_SERVICE') private readonly client: ClientProxy,
  ) {}

  async findMany(
    offset: number | null,
    limit: number | null,
    name: string | null,
    type: number | null,
    department: number | null,
  ): Promise<MSCommunicate> {
    const diemDung = await this.diemDungRepository.find({
      relations: {
        loaiDiemDung: true,
      },
      where: {
        name: Like(`%${name ?? ''}%`),
        loaiDiemDung: Like(`%${type ?? ''}%`),
        donViQuanLyId: department || null,
      },
      skip: limit && offset,
      take: limit,
      select: {
        id: true,
        code: true,
        name: true,
        donViQuanLyId: true,
        loaiDiemDung: {
          id: true,
          name: true,
        },
      },
    });

    const total = await this.diemDungRepository.count();
    const data = {
      diemDung: diemDung,
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

  async findOneById(id: number): Promise<MSCommunicate> {
    const diemDung = await this.diemDungRepository.findOne({
      where: { id: id },
      relations: {
        loaiDiemDung: true,
      },
    });

    if (!diemDung) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DIEM_DUNG,
        null,
        Field.READ,
      );
    }

    const existDuong: MSCommunicate = await this.duongService.findOne(
      diemDung.duongId,
    );

    const existDonVi: MSCommunicate = await firstValueFrom(
      this.client
        .send({ sys: 'don_vi.don_vi.find_one' }, diemDung.donViQuanLyId)
        .pipe(timeout(2000)),
    );

    if (!existDonVi.data) {
      return new MSCommunicate(
        HttpStatus.OK,
        Content.NOT_FOUND,
        Subject.DIEM_DUNG,
        null,
        Field.DON_VI_ID,
      );
    }

    const result = {
      id: diemDung.id,
      code: diemDung.code,
      name: diemDung.name,
      toaDo: diemDung.toaDo,
      diaChi: diemDung.diaChi,
      duong: existDuong.data,
      donVi: existDonVi.data,
      ngaySuDung: diemDung.ngaySuDung,
      ngayKetThuc: diemDung.ngayKetThuc,
      loaiDiemDung: diemDung.loaiDiemDung,
    };

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DIEM_DUNG,
      result,
      Field.READ,
    );
  }

  async createOne(payload: IDiemDung): Promise<MSCommunicate> {
    const existLoaiDiemDung = await this.loaiDiemDungRepository.findOne({
      where: {
        id: payload.loaiDiemDungId,
      },
    });

    if (!existLoaiDiemDung) {
      return new MSCommunicate(
        HttpStatus.OK,
        Content.NOT_FOUND,
        Subject.DIEM_DUNG,
        null,
        Field.LOAI_DIEM_DUNG_ID,
      );
    }

    const existDuong: MSCommunicate = await this.duongService.findOne(
      payload.duongId,
    );

    if (!existDuong.data) {
      return new MSCommunicate(
        HttpStatus.OK,
        Content.NOT_FOUND,
        Subject.DIEM_DUNG,
        null,
        Field.DUONG_ID,
      );
    }

    // check exist don vi quan ly
    const existDonVi: MSCommunicate = await firstValueFrom(
      this.client
        .send({ sys: 'don_vi.don_vi.find_one' }, payload.donViQuanLyId)
        .pipe(timeout(2000)),
    );

    if (!existDonVi.data) {
      return new MSCommunicate(
        HttpStatus.OK,
        Content.NOT_FOUND,
        Subject.DIEM_DUNG,
        null,
        Field.DON_VI_ID,
      );
    }

    // check exist tinh trang
    const checkExistTinhTrang = await this.tinhTrangRepository.findOne({
      where: {
        id: payload.tinhTrangId,
      },
    });
    if (!checkExistTinhTrang)
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DIEM_DUNG,
        null,
        Field.TINH_TRANG_ID,
      );
    // save data
    const diemDung: DiemDungEntity = await this.diemDungRepository.save({
      code: payload.code,
      name: payload.name,
      toaDo: payload.toaDo,
      diaChi: payload.diaChi,
      duongId: payload.duongId,
      donViQuanLyId: payload.donViQuanLyId,
      loaiDiemDung: {
        id: payload.loaiDiemDungId,
      },
      ngaySuDung: new Date(payload.ngaySuDung),
      ngayKetThuc: payload.ngayKetThuc ? new Date(payload.ngayKetThuc) : null,
    });

    const objectDuyTu: DanhMucDuyTuEntity =
      await this.danhMucDuyTuRepository.findOne({
        where: { name: 'Chưa thực hiện duy tu' },
      });

    const duyTuDiemDung: DuyTuDiemDungEntity =
      await this.duyTuDiemDungRepository.save({
        ngayApDung: new Date(),
        chiTietTinhTrang: null,
        ghiChu: null,
        diemDung: {
          id: diemDung.id,
        },
        duyTu: {
          id: objectDuyTu.id,
        },
        tinhTrangDiemDung: {
          id: checkExistTinhTrang.id,
        },
      });

    const data = {
      diemDung: diemDung,
      duyTuDiemDung: duyTuDiemDung,
    };
    // return data
    return new MSCommunicate(
      HttpStatus.CREATED,
      Content.SUCCESSFULLY,
      Subject.DIEM_DUNG,
      data,
      Field.CREATE,
    );
  }

  async updateOne(id: number, payload: IDiemDung): Promise<MSCommunicate> {
    const checkExistDiemDung = await this.diemDungRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!checkExistDiemDung) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DIEM_DUNG,
        null,
        Field.UPDATE,
      );
    }

    const existDuong: MSCommunicate = await this.duongService.findOne(
      payload.duongId,
    );

    if (!existDuong.data) {
      return new MSCommunicate(
        HttpStatus.OK,
        Content.NOT_FOUND,
        Subject.DIEM_DUNG,
        null,
        Field.DUONG_ID,
      );
    }

    // check exist don vi quan ly
    const existDonVi: MSCommunicate = await firstValueFrom(
      this.client
        .send({ sys: 'don_vi.don_vi.find_one' }, payload.donViQuanLyId)
        .pipe(timeout(2000)),
    );

    if (!existDonVi.data) {
      return new MSCommunicate(
        HttpStatus.OK,
        Content.NOT_FOUND,
        Subject.DIEM_DUNG,
        null,
        Field.DON_VI_ID,
      );
    }

    // check exist tinh trang
    const checkExistTinhTrang = await this.tinhTrangRepository.findOne({
      where: {
        id: payload.tinhTrangId,
      },
    });
    if (!checkExistTinhTrang)
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DIEM_DUNG,
        null,
        Field.TINH_TRANG_ID,
      );

    const duyTuDiemDung = await this.duyTuDiemDungRepository.find({
      where: {
        diemDung: {
          id: id,
        },
      },
      order: {
        ngayApDung: 'DESC',
      },
      take: 1,
    });

    await this.diemDungRepository.save({
      id: checkExistDiemDung.id,
      code: CommonHelper.opposite(payload.code, checkExistDiemDung.code),
      name: CommonHelper.opposite(payload.name, checkExistDiemDung.name),
      toaDo: CommonHelper.opposite(payload.toaDo, checkExistDiemDung.toaDo),
      diaChi: CommonHelper.opposite(payload.diaChi, checkExistDiemDung.diaChi),
      duongId: CommonHelper.opposite(
        payload.duongId,
        checkExistDiemDung.duongId,
      ),
      donViQuanLyId: CommonHelper.opposite(
        payload.donViQuanLyId,
        checkExistDiemDung.donViQuanLyId,
      ),
      loaiDiemDung: {
        id: CommonHelper.opposite(
          payload.loaiDiemDungId,
          checkExistDiemDung.id,
        ),
      },
      ngaySuDung: new Date(
        CommonHelper.opposite(
          payload.ngaySuDung,
          checkExistDiemDung.ngaySuDung,
        ),
      ),
      ngayKetThuc: CommonHelper.opposite(
        payload.ngayKetThuc,
        checkExistDiemDung.ngayKetThuc,
      ),
    });

    await this.diemDungRepository.save({
      id: duyTuDiemDung[0].id,
      tinhTrangDiemDung: {
        id: payload.tinhTrangId,
      },
    });

    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DIEM_DUNG,
      payload,
      Field.UPDATE,
    );
  }

  async softDelete(id: number) {
    const checkExistDiemDung = await this.diemDungRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!checkExistDiemDung) {
      return new MSCommunicate(
        HttpStatus.ACCEPTED,
        Content.NOT_FOUND,
        Subject.DIEM_DUNG,
        null,
        Field.DELETE,
      );
    }
    await this.diemDungRepository.softDelete(id);

    const duyTuDiemDung = await this.duyTuDiemDungRepository.find({
      where: {
        diemDung: {
          id: id,
        },
      },
    });
    await this.duyTuDiemDungRepository.softRemove(duyTuDiemDung);
    return new MSCommunicate(
      HttpStatus.OK,
      Content.SUCCESSFULLY,
      Subject.DIEM_DUNG,
      id,
      Field.DELETE,
    );
  }
}

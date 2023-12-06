import { VinhXeBusEntity } from './../../vinhxebus/entities/vinh-xe-bus.entity';
import { HeNoiBoEntity } from './../../henoibo/entities/he-noi-bo.entity';
import { HangRaoEntity } from './../../hangrao/entities/hang-rao.entity';
import { DuongNoiBoEntity } from './../../duongnoibo/entities/duong-noi-bo.entity';
import { CayXanhEntity } from './../../cayxanh/entities/cay-xanh.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { LoaiDiemDungEntity } from './loai-diem-dung.entity';
import { DuyTuDiemDungEntity } from './duy-tu-diem-dung.entity';
import { NhaChoEntity } from '../../nhacho/entities/nha-cho.entity';
import { NhaVeSinhEntity } from '../../nhavesinh/entities/nha-ve-sinh.entity';
import { HeThongChieuSangEntity } from '../../hethongchieusang/entities/he-thong-chieu-sang.entity';
import { BienChiDanEntity } from '../../bienchidan/entities/bien-chi-dan.entity';
import { NhaDieuHanhEntity } from '../../nhadieuhanh/entities/nha-dieu-hanh.entity';
import { VachSonEntity } from '../../vachson/entities/vach-son.entity';
import { PanoEntity } from '../../pano/entities/pano.entity';

@Entity('diem_dung')
export class DiemDungEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'code', length: 50, nullable: false })
  code: string;

  @Column('varchar', { name: 'name', length: 50, nullable: false })
  name: string;

  @Column('varchar', { name: 'toa_do', length: 255, nullable: false })
  toaDo: string;

  @Column('varchar', { name: 'diaChi', length: 255, nullable: false })
  diaChi: string;

  @Column('integer', { name: 'duong_id', nullable: false })
  duongId: number;

  @Column('integer', {
    name: 'don_vi_quan_ly_id',
    nullable: false,
  })
  donViQuanLyId: number;

  @ManyToOne(
    () => LoaiDiemDungEntity,
    (loaiDiemDungEntity) => loaiDiemDungEntity.diemDungs,
  )
  @JoinColumn({ name: 'loai_diem_dung_id' })
  loaiDiemDung: LoaiDiemDungEntity;

  @Column('datetime', { name: 'ngay_su_dung', nullable: false })
  ngaySuDung: Date;

  @Column('datetime', { name: 'ngay_ket_thuc', nullable: true })
  ngayKetThuc: Date;

  duong: any;

  @OneToMany(() => DuyTuDiemDungEntity, (duytu) => duytu.diemDung)
  lichSuDuyTuDiemDung: DuyTuDiemDungEntity[];

  @OneToMany(() => NhaChoEntity, (nhacho) => nhacho.diemDung)
  nhaCho: NhaChoEntity[];

  @OneToMany(() => CayXanhEntity, (item) => item.diemDungCayXanh)
  cayXanh: CayXanhEntity[];

  @OneToMany(() => DuongNoiBoEntity, (item) => item.diemDungDuongNoiBo)
  duongNoiBo: DuongNoiBoEntity[];

  @OneToMany(() => HangRaoEntity, (item) => item.diemDungHangRao)
  hangRao: HangRaoEntity[];

  @OneToMany(() => HeNoiBoEntity, (item) => item.diemDungHeNoiBo)
  heNoiBo: HeNoiBoEntity[];

  @OneToMany(() => VinhXeBusEntity, (item) => item.diemDungVinhXeBus)
  vinhXeBus: VinhXeBusEntity[];

  @OneToMany(() => NhaVeSinhEntity, (item) => item.diemDungNhaVeSinh)
  nhaVeSinh: NhaVeSinhEntity[];

  @OneToMany(
    () => HeThongChieuSangEntity,
    (item) => item.diemDungHeThongChieuSang,
  )
  heThongChieuSang: HeThongChieuSangEntity[];

  @OneToMany(() => BienChiDanEntity, (item) => item.diemDungBienChiDan)
  bienChiDan: BienChiDanEntity[];

  @OneToMany(() => NhaDieuHanhEntity, (item) => item.diemDungNhaDieuHanh)
  nhaDieuHanh: NhaDieuHanhEntity[];

  @OneToMany(() => VachSonEntity, (item) => item.diemDungVachSon)
  vachSon: VachSonEntity[];

  @OneToMany(() => PanoEntity, (item) => item.diemDungPano)
  pano: PanoEntity[];
}

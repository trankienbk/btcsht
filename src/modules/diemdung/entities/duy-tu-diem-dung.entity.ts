import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { DiemDungEntity } from './diem-dung.entity';
import { TinhTrangEntity } from '../../tinhtrang/entities/tinh-trang.entity';
import { DanhMucDuyTuEntity } from '../../duytu/entities/danh-muc-duy-tu.entity';

@Entity('duy_tu_diem_dung')
export class DuyTuDiemDungEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime', {
    name: 'ngay_ap_dung',
    nullable: false,
  })
  ngayApDung: Date;

  @ManyToOne(() => TinhTrangEntity, (tinhTrang) => tinhTrang.diemDung)
  @JoinColumn({ name: 'diem_dung_id' })
  tinhTrangDiemDung: TinhTrangEntity;

  @Column('text', {
    name: 'chi_tiet_tinh_trang',
    nullable: true,
  })
  chiTietTinhTrang: string;

  @Column('text', {
    name: 'ghi_chu',
    nullable: true,
  })
  ghiChu: string;

  @ManyToOne(() => DiemDungEntity, (diemDung) => diemDung.lichSuDuyTuDiemDung)
  @JoinColumn({ name: 'diem_dung_id' })
  diemDung: DiemDungEntity;

  @ManyToOne(() => DanhMucDuyTuEntity, (item) => item.diemDung)
  @JoinColumn({ name: 'duy_tu_id' })
  duyTu: DanhMucDuyTuEntity;
}

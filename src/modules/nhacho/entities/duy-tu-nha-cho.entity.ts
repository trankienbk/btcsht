import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { NhaChoEntity } from './nha-cho.entity';
import { TinhTrangEntity } from '../../tinhtrang/entities/tinh-trang.entity';
import { DanhMucDuyTuEntity } from '../../duytu/entities/danh-muc-duy-tu.entity';
import { ThanhPhanEntity } from '../../bando/thanhphan/entities/thanh-phan.entity';

@Entity('duy_tu_nha_cho')
export class DuyTuNhaChoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime', {
    name: 'ngay_ap_dung',
    nullable: false,
  })
  ngayApDung: Date;

  @ManyToOne(() => TinhTrangEntity, (item) => item.nhaCho)
  @JoinColumn({ name: 'tinh_trang_id' })
  tinhTrang: TinhTrangEntity;

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

  @ManyToOne(() => NhaChoEntity, (item) => item.lichSuDuyTuNhaCho)
  @JoinColumn({ name: 'nha_cho_id' })
  nhaCho: NhaChoEntity;

  @ManyToOne(() => DanhMucDuyTuEntity, (item) => item.nhaCho)
  @JoinColumn({ name: 'duy_tu_id' })
  duyTu: DanhMucDuyTuEntity;

  @ManyToOne(() => ThanhPhanEntity, (item) => item.nhaCho)
  @JoinColumn({ name: 'thanh_phan_id' })
  thanhPhan: ThanhPhanEntity;
}

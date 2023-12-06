import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { PanoEntity } from './pano.entity';
import { TinhTrangEntity } from '../../tinhtrang/entities/tinh-trang.entity';
import { DanhMucDuyTuEntity } from '../../duytu/entities/danh-muc-duy-tu.entity';
import { ThanhPhanEntity } from '../../bando/thanhphan/entities/thanh-phan.entity';

@Entity('duy_tu_pano')
export class DuyTuPanoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime', {
    name: 'ngay_ap_dung',
    nullable: false,
  })
  ngayApDung: Date;

  @ManyToOne(() => TinhTrangEntity, (item) => item.pano)
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

  @ManyToOne(() => PanoEntity, (item) => item.lichSuDuyTuPano)
  @JoinColumn({ name: 'pano_id' })
  Pano: PanoEntity;

  @ManyToOne(() => DanhMucDuyTuEntity, (item) => item.pano)
  @JoinColumn({ name: 'duy_tu_id' })
  duyTu: DanhMucDuyTuEntity;

  @ManyToOne(() => ThanhPhanEntity, (item) => item.pano)
  @JoinColumn({ name: 'thanh_phan_id' })
  thanhPhan: ThanhPhanEntity;
}

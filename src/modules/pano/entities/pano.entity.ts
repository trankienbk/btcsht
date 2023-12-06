import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { DanhMucPanoEntity } from './danh-muc-pano.entity';
import { DuyTuPanoEntity } from './duy-tu-pano.entity';
import { DiemDungEntity } from '../../diemdung/entities/diem-dung.entity';

@Entity('pano')
export class PanoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'name',
    length: 255,
    nullable: false,
  })
  name: string;

  @ManyToOne(() => DanhMucPanoEntity, (item) => item.loaiPano)
  @JoinColumn({ name: 'loai_pano_id' })
  pano: DanhMucPanoEntity;

  @Column('integer', {
    name: 'chieu_dai',
    nullable: false,
  })
  chieuDai: number;

  @Column('integer', {
    name: 'chieu_rong',
    nullable: false,
  })
  chieuRong: number;

  @Column('varchar', { name: 'vat_lieu', nullable: false })
  vatLieu: string;

  @Column('integer', { name: 'nam_dau_tu', nullable: false })
  namDauTu: number;

  @Column('varchar', { name: 'thong_tin', nullable: true })
  thongTin: string;

  @Column('varchar', { name: 'vi_tri', nullable: false })
  viTri: string;

  @Column('text', { name: 'ghi_chu', nullable: true })
  ghiChu: string;

  @Column('varchar', { name: 'mong_description', nullable: true })
  mongDescription: string;

  @ManyToOne(() => DiemDungEntity, (item) => item.pano)
  @JoinColumn({ name: 'diem_dung_id' })
  diemDungPano: DiemDungEntity;

  @Column('varchar', {
    name: 'id_file',
    nullable: false,
  })
  idFile: string;

  @OneToMany(() => DuyTuPanoEntity, (duytu) => duytu.Pano)
  lichSuDuyTuPano: DuyTuPanoEntity[];
}

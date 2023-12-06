import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { DanhMucVachSonEntity } from './danh-muc-vach-son.entity';
import { DuyTuVachSonEntity } from './duy-tu-vach-son.entity';
import { DiemDungEntity } from '../../diemdung/entities/diem-dung.entity';

@Entity('vach_son')
export class VachSonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'name',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string;

  @ManyToOne(() => DanhMucVachSonEntity, (item) => item.loaiVachSon)
  @JoinColumn({ name: 'loai_vach_son_id' })
  vachSon: DanhMucVachSonEntity;

  @ManyToOne(() => DiemDungEntity, (item) => item.vachSon)
  @JoinColumn({ name: 'diem_dung_id' })
  diemDungVachSon: DiemDungEntity;

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

  @Column('integer', {
    name: 'khoang_cach_mep_duong',
    nullable: false,
  })
  khoangCachMepDuong: number;

  @Column('text', {
    name: 'ghi_chu',
    nullable: false,
  })
  ghiChu: string;

  @Column('varchar', {
    name: 'id_file',
    nullable: false,
  })
  idFile: string;

  @OneToMany(() => DuyTuVachSonEntity, (duytu) => duytu.vachSon)
  lichSuDuyTuVachSon: DuyTuVachSonEntity[];
}

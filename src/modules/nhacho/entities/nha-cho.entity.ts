import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { DanhMucNhaChoEntity } from './danh-muc-nha-cho.entity';
import { DiemDungEntity } from '../../diemdung/entities/diem-dung.entity';
import { DuyTuNhaChoEntity } from './duy-tu-nha-cho.entity';

@Entity('nha_cho')
export class NhaChoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @ManyToOne(() => DiemDungEntity, (diemdung) => diemdung.nhaCho)
  @JoinColumn({ name: 'diem_dung_id' })
  diemDung: DiemDungEntity;

  @ManyToOne(
    () => DanhMucNhaChoEntity,
    (danhMucNhaCho) => danhMucNhaCho.nhaCho,
    {
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'loai_nha_cho_id' })
  loaiNhaCho: DanhMucNhaChoEntity;

  @Column('int', { name: 'chieu_dai', nullable: false })
  chieuDai: number;

  @Column('int', { name: 'chieu_rong', nullable: false })
  chieuRong: number;

  @Column('datetime', { name: 'nam_dau_tu', nullable: false })
  namDauTu: Date;

  @Column('text', { name: 'note', nullable: true })
  note: string;

  @Column('varchar', {
    name: 'id_file',
    nullable: false,
  })
  idFile: string;

  @Column('int', { name: 'chieu_dai_mai', nullable: false })
  chieuRongMai: number;

  @Column('int', { name: 'chieu_rong_mai', nullable: false })
  chieuDaiMai: number;

  @Column('varchar', { name: 'vat_lieu_mai', length: 255, nullable: false })
  vatLieuMai: string;

  @Column('int', { name: 'chieu_dai_cot', nullable: false })
  chieuDaiCot: number;

  @Column('int', { name: 'duong_kinh_cot', nullable: false })
  duongKinhCot: number;

  @Column('varchar', { name: 'vat_lieu_cot', length: 255, nullable: false })
  vatLieuCot: string;

  @Column('varchar', { name: 'mau_sac_cot', length: 255, nullable: true })
  mauSacCot: string;

  @Column('int', { name: 'chieu_dai_khung', nullable: false })
  chieuDaiKhung: number;

  @Column('int', { name: 'chieu_rong_khung', nullable: false })
  chieuRongKhung: number;

  @Column('varchar', { name: 'vat_lieu_khung', length: 255, nullable: false })
  vatLieuKhung: string;

  @Column('int', { name: 'chieu_dai_ghe', nullable: false })
  chieuDaiGhe: number;

  @Column('varchar', { name: 'vat_lieu_ghe', length: 255, nullable: false })
  vatLieuGhe: string;

  @Column('int', { name: 'chieu_dai_tam_mica', nullable: false })
  chieuDaiTamMica: number;

  @Column('int', { name: 'chieu_rong_tam_mica', nullable: false })
  chieuRongTamMica: number;

  @Column('text', { name: 'description_tam_mica', nullable: true })
  descriptionTamMica: string;

  @Column('text', { name: 'description_mong', nullable: true })
  descriptionMong: string;

  @Column('text', { name: 'description_lung', nullable: true })
  descriptionLung: string;

  @Column('text', { name: 'description_hong', nullable: true })
  descriptionHong: string;

  @Column('text', { name: 'description_hoi', nullable: true })
  descriptionHoi: string;

  @OneToMany(() => DuyTuNhaChoEntity, (duytu) => duytu.nhaCho)
  lichSuDuyTuNhaCho: DuyTuNhaChoEntity[];
}

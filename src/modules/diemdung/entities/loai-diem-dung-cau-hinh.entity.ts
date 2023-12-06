import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { LoaiDiemDungEntity } from './loai-diem-dung.entity';
import { LoaiDoiTuongEntity } from './loai-doi-tuong.entity';

@Entity('loai_diem_dung_cau_hinh')
export class LoaiDiemDungCauHinhEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean', { name: 'objectStatus', nullable: false })
  objectStatus: boolean;

  @ManyToOne(() => LoaiDiemDungEntity, (diemDung) => diemDung.diemDungCauHinh, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'diem_dung_id' })
  diemDung: LoaiDiemDungEntity;

  @ManyToOne(
    () => LoaiDoiTuongEntity,
    (doiTuong) => doiTuong.diemDungDoiTuong,
    {
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'doi_tuong_id' })
  doiTuong: LoaiDoiTuongEntity;
}

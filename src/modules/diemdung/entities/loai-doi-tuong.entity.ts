import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { LoaiDiemDungCauHinhEntity } from './loai-diem-dung-cau-hinh.entity';

@Entity('loai_doi_tuong')
export class LoaiDoiTuongEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name', length: 255, nullable: false })
  name: string;

  @OneToMany(() => LoaiDiemDungCauHinhEntity, (diemDung) => diemDung.doiTuong)
  diemDungDoiTuong: LoaiDiemDungCauHinhEntity[];
}
